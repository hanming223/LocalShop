
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

    dayComponent: {
        width: '90%',
        height: 110,
        marginTop: 10,
        marginBottom: 10,
        // backgroundColor: 'blue',
        borderColor: 'gray',
        borderWidth: 0.2,
        shadowColor: 'gray',
        shadowRadius: 10,
        shadowOpacity: 0.2,
    },

    dayTitle: {
        fontSize: 17, 
        fontWeight: 'bold', 
        color: 'blue', 
        height: 30
    },

    halfComponentt: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },

    contentContainer: {
        paddingVertical: 0
    },

    signInContainer: {
        width: '90%', 
        height: 45, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#FF7642',
        borderColor: 'gray',
        borderWidth: 0.1,
        shadowColor: 'white',
        shadowRadius: 10,
        shadowOpacity: 0.1,
        marginTop: 10,
        marginBottom: 10
    }
  
};