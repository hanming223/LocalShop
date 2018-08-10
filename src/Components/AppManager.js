export default class AppManager {

    static myInstance = null;

    _userID = "";


    /**
     * @returns {AppManager}
     */
    static getInstance() {
        if (AppManager.myInstance == null) {
            AppManager.myInstance = new AppManager();
        }

        return this.myInstance;
    }

}