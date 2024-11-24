import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminDashboard = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async () => {
        if (selectedUser) {
            // Ngăn chặn xóa người dùng với id = 1
            if (selectedUser.id === 1) {
                alert("Không thể xóa người dùng mặc định.");
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:4000/api/users/${selectedUser.id}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    }
                );

                const contentType = response.headers.get("Content-Type");
                if (!contentType || !contentType.includes("application/json")) {
                    const errorText = await response.text();
                    throw new Error(`Unexpected response: ${errorText}`);
                }

                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.error || "Không thể xóa người dùng");
                }

                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== selectedUser.id)
                );

                setModalVisible(false);
            } catch (err) {
                console.error("Lỗi khi xóa người dùng:", err.message);
                setError(err.message);
            }
        }
    };





    const handleDetails = (user) => {
        navigation.navigate("UserDetail", { user }); // Truyền dữ liệu người dùng sang UserDetail
    };


    const handleLogout = () => {
        navigation.navigate("SignInScreen");
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#535CE8" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Admin Dashboard</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userRow}>
                        <Text style={styles.userId}>{item.id}</Text>
                        <Text style={styles.userName}>{item.name}</Text>
                        <Text style={styles.userEmail}>{item.email}</Text>
                        <TouchableOpacity
                            style={styles.detailButton}
                            onPress={() => handleDetails(item)}
                        >
                            <Text style={styles.detailButtonText}>Chi tiết</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => {
                                setSelectedUser(item);
                                setModalVisible(true); // Hiển thị modal khi nhấn nút Xóa
                            }}
                        >
                            <Text style={styles.deleteButtonText}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View style={styles.tableHeader}>
                        <Text style={[styles.headerText, styles.userId]}>ID</Text>
                        <Text style={[styles.headerText, styles.userName]}>Name</Text>
                        <Text style={[styles.headerText, styles.userEmail]}>Email</Text>
                        <Text style={[styles.headerText, styles.actions]}>Actions</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Đăng xuất</Text>
            </TouchableOpacity>

            {/* Modal xác nhận xóa */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Xác nhận xóa người dùng</Text>
                        <Text style={styles.modalMessage}>
                            Bạn có chắc chắn muốn xóa người dùng này?
                        </Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.deleteButton]}
                                onPress={handleDelete}
                            >
                                <Text style={styles.modalButtonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 16,
        textAlign: "center",
        color: "#333",
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#f4f4f4",
        padding: 8,
        borderRadius: 8,
    },
    headerText: {
        fontWeight: "600",
        color: "#333",
    },
    userRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    userId: {
        width: "5%",
        textAlign: "center",
    },
    userName: {
        width: "25%",
        paddingLeft: 8,
    },
    userEmail: {
        width: "40%",
        paddingLeft: 8,
    },
    actions: {
        width: "30%",
        textAlign: "center",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    detailButton: {
        backgroundColor: "#535CE8",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5,
    },
    detailButtonText: {
        color: "white",
        fontSize: 12,
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 5,
    },
    deleteButtonText: {
        color: "white",
        fontSize: 12,
    },
    logoutButton: {
        backgroundColor: "#535CE8",
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        alignItems: "center",
    },
    logoutButtonText: {
        color: "white",
        fontWeight: "600",
    },
    errorText: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: "80%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
    },
    modalMessage: {
        fontSize: 14,
        marginBottom: 20,
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between", // Căn giữa các nút trong modal
        width: "100%",
    },
    modalButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        width: "40%",
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#ccc",
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
    },
    modalButtonText: {
        color: "white",
        fontWeight: "600",
    },
});

export default AdminDashboard;
