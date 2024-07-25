'use strict'
const cm = require('centimaitre')
const builder = require('electron-builder')
const { task } = require('centimaitre')
const jetpack = require('fs-jetpack')

const createPlatform = (targetPlatform, targetType = undefined) => {
  if (targetPlatform === 'darwin') {
    return builder.Platform.MAC.createTarget(targetType, builder.Arch.universal)
  } else if (targetPlatform === 'win32') {
    return builder.Platform.WINDOWS.createTarget(targetType, builder.Arch.ia32, builder.Arch.x64)
  } else if (targetPlatform === 'linux') {
    return builder.Platform.LINUX.createTarget(targetType, builder.Arch.x64)
  } else {
    throw new Error('targetPlatform can only be linux, win32 or darwin')
  }
}

cm.setDefaultOptions({
  targetPlatform: process.platform, // 'win32' 'darwin' 'linux'
  // targetType: 'nsis', // this is commented, so 'undefined' is used by default, so it uses electron-builder's default, or the targetType you want to build (made for windows, for 'msi' or 'nsis')
})

task('clean-releases', () => jetpack.dirAsync('./releases', { empty: true }))

task('release', ['clean-releases'], (options) => {
  const targets = createPlatform(options.targetPlatform, options.targetType)
  return builder.build({
    targets,
    publish: 'never',
    config: {
      appId: 'build.electron.repro8351',
      forceCodeSigning: false,
      linux: {
        desktop: {
          Version: '1.0', // this is the version of the .desktop file specification
          Name: 'ReproCase',
          Terminal: 'false',
          Type: 'Application',
          Categories: 'Utility;Application;',
          'X-GNOME-Autostart-Delay': '3',
          'X-GNOME-Autostart-enabled': 'true'
        }
      },
      mac: {
        notarize: {
          teamId: process.env.APPLE_TEAM_ID || 'fake'
        }
      }
    }
  })
})
