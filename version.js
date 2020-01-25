//  Updates iOS & Android App Version
//  ===================
//
//  This script extends `npm version` functionality to also
//  update the version number in Info.plist for the App Store,
//  and the versionCode and versionName for Google Play Store.
//
//  It runs after package.json version has been updates, but before git commit.
//
//  See https://docs.npmjs.com/cli/version for more info.
//
//
//  ### Install
//
//  Add to package.json scripts {
//    "version": "node ./version.ts",
//  }
//
//  ### Usage
//
//  "npm version [major|minor|patch]"
//

const { version } = require('./package.json')
const { promisify } = require('util')
const fs = require('fs')
const exec = promisify(require('child_process').exec)

const plistPath = require('path').join(__dirname, './ios/GoenkaNative/Info.plist')

;(async () => {
  // Write new version number to iOS's Info.plist
  await exec(`/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${version}" ${plistPath}`)
  console.log(`ios: Updating to v${version}`)

  // Update Android's build.gradle file
  const gradleBuildPath = './android/app/build.gradle'
  const gradleBuildFile = fs.readFileSync(gradleBuildPath, 'utf8')
  const newGradleFile = gradleBuildFile
    .split('\n')
    .map(line => {
      // Increment versionCode (must be unique, but hidden from users)
      const versionCodeIndex = line.indexOf('versionCode ')
      if (versionCodeIndex !== -1) {
        const oldVersionCode = Number(line.slice(versionCodeIndex + 12).trim())
        console.log(`android: Bumping (private) versionCode to ${oldVersionCode + 1}`)
        return line.slice(0, versionCodeIndex + 12) + (oldVersionCode + 1)
      }

      // Update versionName (user-facing)
      const versionNameIndex = line.indexOf('versionName ')
      if (versionNameIndex !== -1) {
        console.log(`android: Updating versionName to v${version}`)
        return line.slice(0, versionNameIndex + 13) + version + '"'
      }

      return line
    })
    .join('\n')

  fs.writeFileSync(gradleBuildPath, newGradleFile)

  // Add the changed files to git's index before it commits
  await exec('git add .')

  console.log('✅ Success.')
})()
