# React Native Mobile Chat App

## Overview

This project is a mobile chat application built using React Native, Expo, and Firebase. It provides users with a chat interface, the ability to send images, share their location, and continue conversations offline.

## Objective

The goal of this project is to build a fully functional chat app for both Android and iOS platforms, utilizing React Native for cross-platform development. This app will allow users to:

- Enter a chat room.
- Send messages, images, and share their location.
- Access messages offline.
- Use screen readers for accessibility.

## Features

- **User Authentication:** Anonymous user authentication via Firebase.
- **Real-time Chat:** Messages are stored and retrieved in real-time from Firebase Firestore.
- **Send Images:** Users can send images from their device gallery or take a photo using the device’s camera.
- **Share Location:** Users can share their current location with others, displayed in the chat as a map view.
- **Offline Support:** Messages are stored locally and are available offline.
- **Accessibility:** Screen reader compatibility for users with visual impairments.

## User Stories

- As a new user, I want to easily enter a chat room and start chatting with friends.
- As a user, I want to send messages, images, and location data.
- As a user, I want to access my messages even when I’m offline.
- As a visually impaired user, I want to interact with the app using a screen reader.

## Key Technologies

- **React Native:** Framework for building cross-platform mobile apps.
- **Expo:** Tool for developing, building, and deploying React Native apps.
- **Firebase Firestore:** Database to store chat messages.
- **Firebase Authentication:** For anonymous user login.
- **Firebase Cloud Storage:** To store images shared via chat.
- **Gifted Chat:** A React Native library used to create the chat interface.

## Technical Requirements

- Written in React Native.
- Developed using Expo.
- Data stored in Firestore and locally via `asyncStorage`.
- Images stored in Firebase Cloud Storage.
- Location shared via chat in a map view.

## Setup Instructions

1. Clone the repository:
    git clone https://github.com/your-repo/chat-app.git
    cd chat-app

2. Install dependencies:
npm install

3. Run the app:
expo start

4. Firebase Setup: 
**Create a Firebase project.**
-   Enable Firebase Firestore, Firebase Cloud Storage, and Firebase Authentication (Anonymous       sign-in).
- Add Firebase configuration to the project in a .env file.
	
5. Building for iOS/Android:
Follow the Expo documentation to build the app for iOS or Android:
- Building for iOS
- Building for Android

