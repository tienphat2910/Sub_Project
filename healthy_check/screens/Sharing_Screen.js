import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const SharingScreen = ({ navigation, route }) => {
    const { userData } = useContext(UserContext);
    const footer = [
        { id: 1, title: 'Overview', icon: require('../assets/icons/overview.png') },
        { id: 2, title: 'Explore', icon: require('../assets/icons/explore.png') },
        { id: 3, title: 'Sharing', icon: require('../assets/icons/sharing_selected.png'), color: '#535CE8' },
    ];

    const shareArray = [
        { id: 1, image: require('../assets/icons/check.png'), title: 'Keep your health in check', description: 'Keep loved ones informed about your condition.' },
        { id: 2, image: require('../assets/icons/protect.png'), title: 'Protect your privacy', description: 'Share key conclusions. Stop anytime.' },
        { id: 3, image: require('../assets/icons/notify.png'), title: 'Notifications', description: 'Get notified of updates to shared dashboards.' }
    ];

    const [settingModalVisible, setSettingModalVisible] = useState(false);
    const [signOutModalVisible, setSignOutModalVisible] = useState(false);

    const handleFooterPress = (title) => {
        switch (title) {
            case 'Overview':
                navigation.navigate('HomeDashboard');
                break;
            case 'Explore':
                navigation.navigate('ExploreScreen');
                break;
            case 'Sharing':
                navigation.navigate('SharingScreen');
                break;
            default:
                console.log(`${title} pressed`);
                break;
        }
    };

    const handleSignOut = () => {
        setSignOutModalVisible(true);
    };

    const confirmSignOut = () => {
        setSignOutModalVisible(false); // Đóng modal xác nhận
        setSettingModalVisible(false); // Đóng modal Setting
        navigation.navigate('SignInScreen'); // Chuyển hướng đến SignInScreen
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.headerContainer}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sharing</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.listItemContainer}>
                        {shareArray.map((item) => (
                            <View key={item.id} style={styles.listItem}>
                                <Image source={item.image} style={styles.itemImage} resizeMode='contain' />
                                <View style={styles.itemContent}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <Text style={styles.itemDescription}>{item.description}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.shareButton}>
                        <Image source={require('../assets/icons/share.png')} />
                        <Text style={styles.shareText}>Start sharing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingButton} onPress={() => setSettingModalVisible(true)}>
                        <Image source={require('../assets/icons/setting.png')} />
                        <Text style={styles.settingText}>Setting</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                {footer.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.footerItem}
                        onPress={() => handleFooterPress(item.title)}
                    >
                        <Image source={item.icon} style={styles.footerIcon} resizeMode='contain' />
                        <Text style={[styles.footerTitle, { color: item.color || '#000' }]}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Modal Setting */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={settingModalVisible}
                onRequestClose={() => setSettingModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Sign out?</Text>
                    <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                        <Text style={styles.buttonText}>Sign out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setSettingModalVisible(false)}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Modal Confirm Sign Out */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={signOutModalVisible}
                onRequestClose={() => setSignOutModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Bạn có chắc muốn thoát?</Text>
                    <TouchableOpacity style={styles.signOutButton} onPress={confirmSignOut}>
                        <Text style={styles.buttonText}>Thoát</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setSignOutModalVisible(false)}>
                        <Text style={styles.buttonText}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    bodyContainer: {
        padding: 16,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 10,
        backgroundColor: '#FAFAFB',
        borderRadius: 15,
        borderColor: '#BCC1CA',
        borderWidth: 0.5,
        width: 350,
        height: 107
    },
    itemImage: {
        width: 28,
        height: 28,
        marginRight: 10,
        marginTop: 11,
        marginLeft: 10,
        position: 'relative',
        alignSelf: 'flex-start',

    },
    itemContent: {
        flex: 1,
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderTopWidth: 1,
    },
    footerItem: {
        alignItems: 'center',
        padding: 10,
    },
    footerIcon: {
        width: 24,
        height: 24,
    },
    footerTitle: {
        marginTop: 5,
        fontSize: 12,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signOutButton: {
        backgroundColor: '#FF3D00',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    shareButton: {
        width: 350,
        height: 52,
        borderRadius: 25,
        backgroundColor: '#535CE8',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    shareText: {
        color: '#fff',
        marginLeft: 8,
    },
    settingButton: {
        width: 350, height: 52, borderRadius: 25, backgroundColor: '#fff', alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        marginTop: 20,
    },
    settingText: {
        fontSize: 16, fontWeight: '400', color: '#424955', marginLeft: 10
    },
});

export default SharingScreen;
