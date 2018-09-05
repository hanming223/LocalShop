
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
        shadowRadius: 5,
        shadowOpacity: 0.3,
        marginTop: 10
        
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

    titleStyle: {
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
        height: 55, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
    }
};