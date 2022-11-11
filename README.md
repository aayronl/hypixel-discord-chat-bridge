# Hypixel Discord Chat Bridge
A two way "bridge" between a Discord channel and a Hypixel Guild chat: this allows someone to type in Discord and have their message relayed in game, and vice versa.


# Requirements
- Linux/MacOS/Windows
- Node.js
- A text editor of your choice
- A Minecraft account
- A Discord account

Note: It's recommended that you run this program on a VPS so it never goes offline.

# Getting started
If you do not have Node.js installed, head on over to the [official website](https://nodejs.org/en/) and grab the latest installer for your operating system.

1. Clone this repository by running 
```bash
git clone https://github.com/aayronl/hypixel-guild-chat-bridge.git
```
2. Enter the directory
```bash
cd hypixel-guild-chat-bridge
```
3. Make a copy of the example configuration file
```bash
cp config.example.js config.js
```
4. Now, open up your editor of choice, and edit the config. 

5. Install dependencies
```bash
npm install
```
6. Run the program!
```bash
npm start
```