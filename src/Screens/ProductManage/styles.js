
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

    TextInputStyle: {
        height: 45, 
        width: '100%', 
        paddingLeft: 20, 
        paddingRight: 20
    },

    TextInputContainer: {
        height: 45,
        width: '90%', 
        backgroundColor: 'white', 
        borderColor: 'gray', 
        borderWidth: 0.1,
        shadowColor: 'gray',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        marginTop: 10,
        
    },

    gridView: {
        width: '100%',
        flex: 1,
    },

    itemImageContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        height: 150,
    },

    itemViewContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        height: 150,
        backgroundColor: 'lightgray'
    },

    itemName: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
        marginLeft: 4,
        marginBottom: 4
    }

};