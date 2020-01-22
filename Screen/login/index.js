import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import {connect} from 'react-redux'

class Login extends React.Component{

    static navigationOptions = {
        headerShown: false
    }

    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            errorMsg:''
        }
        this.loginButton = this.loginButton.bind(this); 
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this); 
        this.checkLogin = this.checkLogin.bind(this);
    }

    setUsername(text){
        this.setState({
            username:text,
            errorMsg:''
        })
    }

    setPassword(text){
        this.setState({
            password:text,
            errorMsg:''
        })
    }

    loginButton(){
        if (this.state.username.length == 0) {
            this.setState({
                errorMsg:'Enter username'
            });
            return;
        } else if (this.state.password.length == 0) {
            this.setState({
                errorMsg:'Enter password'
            });
            return;
        }

        fetch('http://192.168.8.102/react/login.php',
        {
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                passwordx:this.state.password,
                userName:this.state.username,
            })
        }).then(res=>{
            return res.text()
        }).then(
            res=>this.checkLogin(res)
        );
    }

    checkLogin(res){
        if (res == 1 ) {
            this.props.setUsernameRedux(this.state.username);
            this.props.navigation.navigate('Account');
            return;
        }
        else{
            this.setState({
                errorMsg:res
            })
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                    
                    <View style={styles.outterContainer}>
                        <Text style={styles.title}>
                            Login to App
                        </Text>
                        
                        <Text style={styles.text}>
                            Enter username
                        </Text>
                        <TextInput placeholder="username"
                            underlineColorAndroid="black"
                            onChangeText={(text)=>this.setUsername(text)}
                        />

                        <View style={styles.sizeBox}>

                        </View>

                        <Text style={styles.text}>
                            Password
                        </Text>
                        <TextInput placeholder="password"
                            secureTextEntry={true}
                            underlineColorAndroid="black"
                            onChangeText={(text)=>this.setPassword(text)}
                        />

                        <View style={styles.sizeBox}>

                        </View>
                        <Text style={styles.errorText}>
                            {this.state.errorMsg}
                        </Text>

                        <View style={styles.center}>
                            <TouchableOpacity style={styles.button} onPress={this.loginButton}>
                                <Text style={styles.buttonText}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </SafeAreaView>
                
            </View>
        );
    }
};

function mapStateToProps(state) {
    return{
       // username:state.username
    }
}

function mapDispatchToProps(dispatch) {
    return{
        setUsernameRedux:(text)=>{
            dispatch({type:'SET_USERNAME',username:text})
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);

const styles = StyleSheet.create({

    outterContainer:{
        padding: 10,
        paddingTop:50,
        flex:1,
        backgroundColor:"white",
    },
      
    container:{
      flex:1,
      backgroundColor:"white",
    },

    button:{
        backgroundColor:"#00468b",
        width:200,
        alignItems:'center',
        justifyContent:'center',
        height:40,
        // flex:1,
    },

    center:{
        // backgroundColor:'black',
        alignItems:'center',
        justifyContent:'center',
        // justifyContent:'center'
    },

    buttonText:{
        color:'#fff',
        textAlign:'center',
        // backgroundColor:'red',
        marginTop:0,
       // marginBottom:10,
        fontSize:18,
        justifyContent:'center',
    },

    sizeBox:{
        height:20,
    },

    text:{
        color:"#161924",
        fontSize:20,
        fontWeight:"500"
    },

    errorText:{
        color:"red",
        fontSize:18,
        fontWeight:"500"
    },

    title:{
        color:"#00008b",
        fontSize:24,
        fontWeight:"bold",
        paddingTop: 40,
        paddingBottom: 50,
        textAlign:'center'
    },
});