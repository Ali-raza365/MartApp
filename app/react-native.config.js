
module.exports = {
    project:{
        android:{},
        ios:{}
    },
    "react-native-vector-icons":{
        platform:{
            ios:{}
        }
    },
    "assets":["./src/assets/fonts/"],
    getTranferModuelePath(){
        return require.resolve("")
    },
    getSourceExit(){
        return ["ts","tsx"]
    }
};