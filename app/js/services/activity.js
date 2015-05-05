export class ActivityHelper {
  constructor() {
    this.ready = new Promise((resolve, reject) => {
      if (navigator.mozHasPendingMessage('activity')) {
        navigator.mozSetMessageHandler('activity', activity => {
          let activitySource = activity.source;

          if (activitySource.name !== 'customize') {
            activity.postError('Unsupported activity');
            return;
          }

          resolve(activitySource.data.manifestURL);
        });
      } else {
        console.log('Not an activity');
        resolve(false);
      }
    });
  }
}