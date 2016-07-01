# BeriaGrainTerminal
# How to setup the project.
# Windows
Inorder to run this example on Windows. The following programs are required.

- Visual Studio 2013
- Pyhton 2.7
- Node.js
- git


Instalaltion instructions for these programs can be found on their respective websites.
# linux
This project is yet to be tested on linux.

#Download the repository files to your pc.
Make an project folder.
```
mkdir MyProject
```
Download the project using git
```
git clone https://github.com/HanrichPotgieter/BeriaGrainTerminal.git
```
#Downloading depedencies and compiling the S7 driver.
Set Visual Studios 2013 as your building enviroment for npm
```
npm config set msvs_version 2013
```
Download all the required dependacies
```
npm install
```
#Starting the Webserver
```
gulp
```

