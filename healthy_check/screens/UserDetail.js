import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserDetail = ({ route, navigation }) => {
    const { user } = route.params; // Lấy dữ liệu từ AdminDashboard
    const [name, setName] = useState(user.name);
    const [avatar, setAvatar] = useState(user.avatar);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true); // Đánh dấu trạng thái đang tải
        try {
            const response = await fetch(
                `http://localhost:4000/api/users/${user.id}`, // Đảm bảo đường dẫn đúng
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        avatar,
                    }),
                }
            );

            const responseData = await response.json(); // Đọc dữ liệu trả về từ server
            if (!response.ok) {
                throw new Error(responseData.error || "Không thể cập nhật thông tin người dùng");
            }

            // Nếu thành công, thông báo và quay lại màn hình trước
            Alert.alert("Thành công", "Thông tin người dùng đã được cập nhật.");
            navigation.goBack(); // Quay lại AdminDashboard
        } catch (err) {
            console.error("Lỗi khi cập nhật người dùng:", err.message);
            Alert.alert("Lỗi", err.message); // Hiển thị thông báo lỗi nếu có
        } finally {
            setLoading(false); // Đánh dấu trạng thái kết thúc
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Chi Tiết Người Dùng</Text>

            {/* Hiển thị avatar */}
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: avatar }}
                    style={styles.avatar}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>ID:</Text>
                <Text style={styles.value}>{user.id}</Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Nhập tên"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Avatar URL:</Text>
                <TextInput
                    style={styles.input}
                    value={avatar}
                    onChangeText={setAvatar}
                    placeholder="Nhập đường dẫn Avatar"
                />
            </View>

            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={loading}
            >
                <Text style={styles.saveButtonText}>
                    {loading ? "Đang lưu..." : "Lưu Thay Đổi"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.cancelButtonText}>Quay Lại</Text>
            </TouchableOpacity>
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
    avatarContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    avatar: {
        width: 120, // Kích thước ảnh
        height: 120, // Kích thước ảnh
        borderRadius: 60, // Bo tròn bằng nửa kích thước
        borderWidth: 2,
        borderColor: "#ddd",
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#555",
    },
    value: {
        fontSize: 16,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 8,
        fontSize: 16,
        marginTop: 8,
    },
    saveButton: {
        backgroundColor: "#535CE8",
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        alignItems: "center",
    },
    saveButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: "#ddd",
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#333",
        fontWeight: "600",
        fontSize: 16,
    },
});

export default UserDetail;
