import React from 'react';
import {CardElement, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';



const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>

            <SimpleCardForm handlePayment={handlePayment} ></SimpleCardForm>

            {/* <SplitCardForm></SplitCardForm> */}


            {/* <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                            color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
                /> */}
        </Elements>
    );
};

export default ProcessPayment;