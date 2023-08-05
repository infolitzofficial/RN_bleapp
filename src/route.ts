enum ROUTE {
    LOGIN = "Login",
    REGISTER = "Register",
    BID = "bid",
    BIDDETAIL = "Bid Detail"
}

export type RootStackParamList = {
    LOGIN: string;
    REGISTER: string;
    BID: string;
    BIDDETAIL: string;
}

export default ROUTE;