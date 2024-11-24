CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    avatar VARCHAR(255) NOT NULL
);

INSERT INTO users (id, email, password, name, avatar) VALUES
    (1, 'doraemon@gmail.com', 'password1', 'Doraemon', 'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/26/498/avatar-doremon-cute-4.jpg'),
    (2, 'nobita@gmail.com', 'password2', 'Nobita', 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474092Ykw/avatar-nobita-sieu-dep_091512515.jpg'),
    (3, 'luffy@gmail.com', 'password3', 'Luffy', 'https://m.yodycdn.com/blog/anh-luffy-yody-vn-65.jpg'),
    (4, 'alice@gmail.com', 'password4', 'Alice', 'https://cdn2.fptshop.com.vn/unsafe/800x0/avatar_meo_4_57f5ca33f7.jpg'),
    (5, 'tienphat@gmail.com', 'tienphat29', 'Tien Phat', 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-1.jpg'),
    (6, 'angel@gmail.com', 'password6', 'Angel', 'https://doanhnhanphaply.vn/wp-content/uploads/2024/09/avatar-anh-meo-cute-7-1.jpg');


