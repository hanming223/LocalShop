
import {
    Dimensions,
} from 'react-native';

const deviceHeight = Dimensions.get("window").height;

export default {
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%'
    },

    safeArea: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },

};