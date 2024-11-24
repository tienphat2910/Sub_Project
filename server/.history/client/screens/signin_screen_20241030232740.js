import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal } from 'react-native';
import axios from 'axios';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [userData, setUserData] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignIn = () => {
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError('Vui lòng nhập email hợp lệ');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      axios.post('http://localhost:3000/api/login', { email, password })
        .then((response) => {
          const data = response.data;
          setModalMessage(data.message);
          setModalVisible(true);
          if (data.success) {
            setUserData(data.user); // Lưu thông tin người dùng từ phản hồi
            navigation.navigate('Screen01', { user: data });
          }
        })
        .catch((error) => {
          setModalMessage('Có lỗi xảy ra, vui lòng thử lại');
          setModalVisible(true);
          console.error('Lỗi khi đăng nhập:', error);
        });
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Welcome back! 👋</Text>
      </View>

      <View style={styles.signIn}>
        <View style={styles.signInForm}>
          <Text style={styles.signInEmail}>Email</Text>
          <TextInput
            style={styles.signInEmailInput}
            placeholder='Enter email'
            placeholderTextColor="#bcc1ca"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.signInPassword}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder='Enter password'
              placeholderTextColor="#bcc1ca"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
              <Image
                style={styles.hideIcon}
                source={passwordVisible ? require('../assets/icons/opened_eye.png') : require('../assets/icons/closed_eye.png')}
              />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.alternateLogIn}>OR LOG IN WITH</Text>

          <View style={styles.icons}>
            <Image style={styles.icon} source={require('../assets/icons/google.png')} />
            <Image style={styles.icon} source={require('../assets/icons/facebook.png')} />
            <Image style={styles.icon} source={require('../assets/icons/apple.png')} />
          </View>
        </View>

        <View style={styles.signUp}>
          <Text style={styles.signUpText}>
            Don't have an account?
            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.signUpLink}> Sign up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  greeting: {
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  signIn: {
    flex: 1,
    justifyContent: 'center',
  },
  signInForm: {
    marginBottom: 20,
  },
  signInEmail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInEmailInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  signInPassword: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  iconContainer: {
    paddingLeft: 10,
  },
  hideIcon: {
    width: 24,
    height: 24,
  },
  forgotPassword: {
    color: '#007bff',
    textAlign: 'right',
    marginVertical: 10,
  },
  signInButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  alternateLogIn: {
    textAlign: 'center',
    marginVertical: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    width: 40,
    height: 40,
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default SignInScreen;
