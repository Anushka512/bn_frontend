import React from "react";
import { validateCoupon } from "../../Redux/slices/orderSlice";
import "./Ship.scss";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";

const Ship = () => {
  let carts = useSelector((state) => state.products.carts);
  const [coupon, setCoupon] = React.useState("");
  const [isApplied, setApplied] = React.useState(null);
  const [couponDetail, setCouponDetail] = React.useState({
    code: "",
    minRate: 0,
    percent: 0,
  });

  const [billingInfo, setBillingInfo] = React.useState({
    name: "John Doe",
    email: "john@gmail.com",
    phone: "9696969696",
    address: "Front of Ate",
    pincode: "22222",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
  });
  const dispatch = useDispatch();
  const cartTotal = () => {
    return carts?.reduce(function (total, item) {
      return (
        total +
        (item.productDefaultPrice.quantity || 1) *
          item.productDefaultPrice.price
      );
    }, 0);
  };

  const handleChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  // To Validate The Copon Code
  const HandleCoupon = async () => {
    try {
      const responseData = await dispatch(validateCoupon(coupon));

      if (responseData.payload.status === "error") {
        setApplied(false);
      } else {
        setCouponDetail((prevState) => {
          const { result } = responseData.payload;
          const { code, min, discount } = result;

          return {
            ...prevState,
            code,
            minRate: min,
            percent: discount,
          };
        });

        setApplied(cartTotal() >= couponDetail.percent ? true : false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const applyDiscount = (subtotal) => {
    if (cartTotal() >= couponDetail.minRate) {
      const discountAmount = (subtotal * couponDetail.percent) / 100;
      return subtotal - discountAmount;
    } else {
      return subtotal;
    }
  };
  return (
    <>
      <section className="contain checkout-wrapper">
        <div className="ship-address">
          <h5 className="ship-tittle">Ship to</h5>
          <form className="ship-form">
            <div className="input-group">
              <div className="input-label">Full Name*</div>
              <input
                type="text"
                name="name"
                value={billingInfo.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <div className="input-label">Phone Number*</div>
              <input
                type="text"
                name="phone"
                value={billingInfo.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <div className="input-label">Email*</div>
              <input
                type="text"
                name="email"
                value={billingInfo.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <div className="input-label">Street Address*</div>
              <input
                type="text"
                name="address"
                value={billingInfo.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group ig">
              <div className="ig-1">
                <div className="input-label">State*</div>
                <input
                  type="text"
                  name="state"
                  value={billingInfo.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ig-1">
                <div className="input-label">Pincode Code*</div>
                <input type="text" required />
              </div>
            </div>
            <div className="input-group ig">
              <div className="ig-1">
                <div className="input-label">City*</div>
                <input type="text" required />
              </div>
              <div className="ig-1">
                <div className="input-label">Country*</div>
                <input type="text" value="India" required disabled />
              </div>
            </div>
            <div className="input-group checkbox">
              <input type="checkbox" />
              <div>Save my Address</div>
            </div>
            <div className="ship-btn">Place Order</div>
          </form>
        </div>
        <div className="ship-detail">
          <div className="ship-orders">
            <div className="order_review box-shadow bg-white">
              <div className="check-heading">
                <h3>Your Orders</h3>
              </div>
              {carts.length > 0 ? (
                <div className="form-group">
                  <label htmlFor="fname" style={{ marginTop: "20px" }}>
                    Coupon Code :
                  </label>
                  {isApplied === true
                    ? "Coupon Code Applied"
                    : isApplied === false
                    ? "Invalid Coupon Code"
                    : ""}
                  <input
                    type="text"
                    required={true}
                    className="form-control"
                    id="coupon"
                    placeholder="Enter Coupon Code"
                    name="coupon"
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    type="submit"
                    style={{ marginTop: "10px" }}
                    onClick={(e) => {
                      HandleCoupon(e);
                    }}
                    className="theme-btn-one btn-black-overlay btn_sm"
                  >
                    Validate
                  </button>
                </div>
              ) : null}

              <div className="table-responsive order_table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((data) => (
                      <tr>
                        <td>
                          {data.name}
                          <span className="product-qty">
                            {data.quantity || 1}
                          </span>
                        </td>
                        <td>
                          ₹{data.price} X ({data.quantity || 1}) ={" "}
                          {data.price * (data.quantity || 1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>SubTotal</th>
                      <td className="product-subtotal">₹{cartTotal()}.00</td>
                    </tr>
                    <tr>
                      <th>Discount</th>
                      <td>
                        ₹
                        {couponDetail.percent > 0 &&
                        cartTotal() >= couponDetail.minRate
                          ? (cartTotal() * couponDetail.percent) / 100
                          : 0}
                        .00
                      </td>
                    </tr>
                    <tr>
                      <th>Shipping</th>
                      <td>Free Shipping</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td className="product-subtotal">
                        ₹{applyDiscount(cartTotal())}.00
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Ship;
