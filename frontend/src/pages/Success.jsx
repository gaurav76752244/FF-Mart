import { Link } from "react-router-dom";

function Success(){

    return(

        <div className="success-page">

            <h1>
                Order Placed Successfully 🎉
            </h1>

            <p>
                Thank You For Shopping From FF-Mart 😎
            </p>

            <Link to="/products">

                <button>
                    Continue Shopping
                </button>

            </Link>

        </div>

    )

}

export default Success;