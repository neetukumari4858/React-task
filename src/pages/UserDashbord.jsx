import React, { useState } from "react";
import { UserDetail } from "../context/UserContext";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

const UserDashbord = () => {
  const [image, setImage] = useState();
  const [productInfo, setProductInfo] = useState({
    productName: "",
    productDescription: "",
  });

  const { productName, productDescription } = productInfo;
  const [variants, setVariant] = useState([{ name: "", amount: "" }]);

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

    setVariant([...variants, { name: "", amount: "" }]);
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
      productData: [
        { productInfo: productInfo, variants: variants, image: image },
      ],
    };
    var userProducts = JSON.parse(localStorage.getItem("userProducts") || "[]");
    const getUserProduct = userProducts?.find(
      (item) => item.userData.email === email
    );
    if (!getUserProduct) {
      userProducts.push(UserProductDetail);
      localStorage.setItem("userProducts", JSON.stringify(userProducts));
    }

    toast.success("Form Submitted successfully!");

    setProductInfo({ productName: "", productDescription: "" });
    setVariant([{ name: "", amount: "" }]);
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
        <label>Product Image:</label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/svg"
          onChange={(e) => setImage(e.target.files[0])}
          className="input-feild userInputFeild"
        />
        <label>Variants:</label>
        <div className="variants">
          {variants?.map((item, index) => {
            return (
              <>
                <input
                  value={item.name}
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="variants-elements"
                  onChange={(e) => variantHandler(e, index)}
                />
                <input
                  value={item.amount}
                  name="amount"
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
