# SER 423

Course work for SER 423 Mobile Systems at Arizona State University

## Environment

1. Install Expo Go application on device
1. Install Expo Go CLI

    ```shell
    npm install expo-cli -g
    ```

## Development

1. Create expo project

    ```shell
    expo init project_name
    ```

## Run

1. Run the expo project on the Android Emulator

    1. Start the virtual device

        ```shell
        start "" "C:\Program Files\Genymobile\Genymotion\player.exe" --vm-name "Google Nexus 5"
        ```

    1. Run expo

        ```shell
        cd project_name
        npm run android
        ```

1. Run the expo project as an Android app

    ```shell
    cd project_name
    npm start
    ```

    - Open Expo app on device and scan QR code


