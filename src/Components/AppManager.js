export default class AppManager {

    static myInstance = null;

    _userID = "";

    addShopFormData = null;
    shopInfoFormData = null;

    selectedShopInfo = null;

    shopInfoScreenKey = '';

    similarProductArray = []

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