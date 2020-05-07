# authentication-API
simple email/password authentication API made with Express.js MongoDB
i made it 

end points => method => input => output
user/register => post => { username, email, password } => {user} , header:{token}
user/login => post => { email, password } => {user} , header:{token}
user/ => get => {} => {user} , header:{token}
