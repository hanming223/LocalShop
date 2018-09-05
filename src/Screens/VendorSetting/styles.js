
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

    },

    TextInputContainer: {
        height: 45,
        width: '100%', 
        backgroundColor: 'white', 
        borderColor: 'gray', 
        borderWidth: 0.1,
        shadowColor: 'gray',
        shadowRadius: 2,
        shadowOpacity: 0.2,
        marginTop: 6,
        marginBottom: 6,
        shadowOffset:{  width: 2,  height: 2 }
        
    },

    TextInputStyle: {
        height: 45, 
        width: '100%', 
        paddingLeft: 20, 
        paddingRight: 20
    },

    TouchableOpacityStyle: {
        width: '50%', 
        height: 40, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    signInStyle_selected: {
        color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold'
    },

    signInStyle_unselected: {
        color: '#ffc4b3', 
        fontSize: 20, 
        fontWeight: 'bold'
    },

    signInContainer: {
        width: '100%', 
        height: 45, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#FF7642',
        borderColor: 'gray',
        borderWidth: 0.1,
        shadowColor: 'white',
        shadowRadius: 10,
        shadowOpacity: 0.1,
        marginBottom: 10
    }
};