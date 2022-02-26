import * as Updates from 'expo-updates';

export default function getEnvironment() {
  if (Updates.releaseChannel.startsWith('prod')) {
    // matches prod-v1, prod-v2, prod-v3
    return { envName: 'PRODUCTION', apiUrl: '' }; // prod env settings
  } else if (Updates.releaseChannel.startsWith('staging')) {
    // matches staging-v1, staging-v2
    return { envName: 'STAGING', apiUrl: '' }; // stage env settings
  } else {
    // assume any other release channel is development
    return {
      envName: 'DEVELOPMENT',
      apiUrl: 'https://api.com/graphql'
    }; // dev env settings
  }
}