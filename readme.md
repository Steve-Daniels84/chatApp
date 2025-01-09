# React Native Mobile Chat App

## Overview

This project is a mobile chat application built using React Native, Expo, and Firebase. It enables users to communicate in real-time, share images, send location information, and access messages offline. The app includes accessibility features such as screen reader compatibility, providing a more inclusive experience for all users.

## Objective

The goal of this project is to build a fully functional chat app for both Android and iOS platforms using React Native. The app allows users to:

- Enter a chat room.
- Send messages, images, and share their location.
- Access messages offline.
- Use screen readers for accessibility.

## Features

- **User Authentication:** Anonymous user authentication via Firebase.
- **Real-time Chat:** Messages are stored and retrieved in real-time from Firebase Firestore.
- **Send Images:** Users can send images from their device gallery or take a photo using the device’s camera.
- **Share Location:** Users can share their current location with others, which is displayed in the chat as a map view.
- **Offline Support:** Messages are stored locally and are available offline.
- **Accessibility:** The app supports screen readers and offers an inclusive experience for users with visual impairments.
- **Permissions Management:** Requests for media library, camera, and location permissions with appropriate alerts when permissions are not granted.

## User Stories

- As a new user, I want to easily enter a chat room and start chatting with friends.
- As a user, I want to send messages, images, and location data.
- As a user, I want to access my messages even when I’m offline.
- As a visually impaired user, I want to interact with the app using a screen reader.
- As a user, I want to manage permissions for media, camera, and location access in a secure and straightforward manner.

## Key Technologies

- **React Native:** Framework for building cross-platform mobile apps.
- **Expo:** Tool for developing, building, and deploying React Native apps.
- **Firebase Firestore:** Database for storing chat messages in real-time.
- **Firebase Authentication:** For anonymous user login.
- **Firebase Cloud Storage:** For storing images shared via chat.
- **Gifted Chat:** A React Native library used to create the chat interface.
- **Expo Image Picker:** For selecting images from the device gallery or taking photos.
- **Expo Location:** For fetching and sharing the user's location.
- **React Native Action Sheet:** For providing media and location action options.

## Technical Requirements

- Written in React Native with Expo.
- Real-time data storage in Firebase Firestore.
- Local storage for offline support using `asyncStorage`.
- Image and location sharing through Firebase Cloud Storage and Expo Location.
- Permission handling for camera, media library, and location services.

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/chat-app.git
    cd chat-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the app:
    ```bash
    expo start
    ```

4. Firebase Setup: 
**Create a Firebase project** and enable the following services:
- Firebase Firestore
- Firebase Cloud Storage
- Firebase Authentication (Anonymous sign-in)
  
Add your Firebase configuration to the project in a `.env` file.

5. Building for iOS/Android:
Follow the Expo documentation to build the app for iOS or Android:
- [Building for iOS](https://docs.expo.dev/build-reference/ios/)
- [Building for Android](https://docs.expo.dev/build-reference/android/)

## Known Issues

- Permissions for media, camera, and location services may require explicit user approval and proper handling.
- Certain accessibility features like screen reader compatibility for action sheets and media options may require further refinements.

