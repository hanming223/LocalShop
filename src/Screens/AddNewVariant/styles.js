
import {
    Dimensions,
} from 'react-native';

const deviceHeight = Dimensions.get("window").height;

export default {

    safeArea: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
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

    TextInputDescriptionContainer: {
        height: 150,
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
    }

    
};