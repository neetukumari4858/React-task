import React, { useState } from "react";
import { UserDetail } from "../context/UserContext";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

const UserDashbord = () => {
  const [productInfo, setProductInfo] = useState({
    productName: "",
    productDescription: "",
  });

  const { productName, productDescription } = productInfo;
  const [variants, setVariant] = useState([{ Name: "", Amount: "" }]);

  const { userData } = UserDetail();

  const { email } = userData;

  const variantHandler = (e, index) => {
    const { value, name } = e.target;
    const onChangeVariant = [...variants];
    onChangeVariant[index][name] = value;
    setVariant(onChangeVariant);
  };

  const addVariantHandler = (e) => {
    e.preventDefault();

    setVariant([...variants, { Name: "", Amount: "" }]);
  };

  const handleDelete = (index) => {
    const deleteVariant = [...variants];
    deleteVariant.splice(index, 1);
    setVariant(deleteVariant);
  };
  const onChangeHandle = (e) => {
    const { value, name } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const UserProductDetail = {
      userData: userData,
      productInfo: productInfo,
      variants: variants,
    };
    var userProducts = JSON.parse(localStorage.getItem("userProducts") || "[]");
    const getUserProduct = userProducts?.find((item) => email === item?.email);
    if (!getUserProduct) {
      userProducts.push(UserProductDetail);
      localStorage.setItem("userProducts", JSON.stringify(userProducts));
    }

    toast.success("Form Submitted successfully!");

    setProductInfo({ productName: "", productDescription: "" });
    setVariant([{ Name: "", Amount: "" }]);
  };

  return (
    <div className="container">
      <h1 className="heading">User Dashbord</h1>
      <form className="userdashbord" onSubmit={handleSubmit}>
        <label>Product Information</label>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={productName}
          className="input-feild userInputFeild"
          onChange={onChangeHandle}
        />
        <input
          type="text"
          name="productDescription"
          placeholder="Product Description"
          value={productDescription}
          className="input-feild userInputFeild"
          onChange={onChangeHandle}
        />
        <label>Variants:</label>
        <div className="variants">
          {variants?.map((item, index) => {
            return (
              <>
                <input
                  value={item.Name}
                  name="Name"
                  type="text"
                  placeholder="Name"
                  className="variants-elements"
                  onChange={(e) => variantHandler(e, index)}
                />
                <input
                  value={item.Amount}
                  name="Amount"
                  type="number"
                  placeholder="Amount"
                  className="variants-elements"
                  onChange={(e) => variantHandler(e, index)}
                />
                <div onClick={() => handleDelete(index)} className="cross">
                  <RxCross2 />
                </div>
              </>
            );
          })}
        </div>
        <div className="variant-btn">
          <button onClick={addVariantHandler} className="add-variant-btn">
            Add Variant
          </button>
          <button type="submit" className="login-btn product-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDashbord;
