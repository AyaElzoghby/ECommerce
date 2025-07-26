import mastercard from "../../assets/images/mastercard.webp";
import paypal from "../../assets/images/paypal.png";
import AmericanExpress_Color from "../../assets/images/AmericanExpress_Color.png";
import amazon_pay from "../../assets/images/amazon_pay.png";
import get_apple_store from "../../assets/images/get_apple_store.png";
import get_google_play from "../../assets/images/get_google_play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-8">
        <div className="container space-y-4 mx-auto">
         <header> <h2 className="text-xl font-tmedium text-slate-800 ">Get the FreshCart App</h2>
         <p className="text-slate-400">We will send you a Link, open it in Your Phone to Download the App</p></header>
         <div className="flex gap-2">
          <input className="form-control grow" type="email" name="" id="" placeholder="Email Address" />
          <button className="btn uppercase bg-mainColor-600 hover:bg-mainColor-800 text-sm text-white font-tmedium">Share App Link</button>
         </div>
         <div className="flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50">
          <div className="payment-partners flex gap-3 items-center">
            <h3>Payment Parteners</h3>
            <img className="w-24" src={amazon_pay} alt=""  />
            <img className="w-24" src={AmericanExpress_Color} alt=""  />
            <img className="w-24" src={paypal} alt=""  />
            <img className="w-20" src={mastercard} alt=""  />
          </div>
          <div className="download flex gap-3 items-center"></div>
          <h3>Get deliveries with FreshCart</h3>
          <img className="w-24" src={get_apple_store} alt=""  />
          <img className="w-[110px]" src={get_google_play} alt=""  />

         </div>
        </div>
      </footer>
    </>
  );
}
