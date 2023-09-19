import React from "react";

const AdminDashbord = () => {
  var getUserProducts = JSON.parse(
    localStorage.getItem("userProducts") || "[]"
  );

  return (
    <div className="container">
      <h1 className="heading">Admin Dashbord</h1>
      {getUserProducts.length !== 0 ? (
        <div className="card-container">
          {getUserProducts.map((item, i) => {
            return (
              <div className="card">
                <h1> {i + 1}. User Information </h1>
                <p>Email: {item.userData.email}</p>
                <p>Password: {item.userData.password}</p>

                <h1>Product Information: </h1>
                {item.productData.map((productItem) => {
                  return (
                    <>
                      <p>Product Name: {productItem.productInfo.productName}</p>
                      <p>
                        Product Description:
                        {productItem.productInfo.productDescription}
                      </p>
                      {productItem.variants.length === 0 ? (
                        <h2>Product Variants:</h2>
                      ) : null}

                      <p>
                        {productItem.variants.map((variantItem) => {
                          const { name, amount } = variantItem;
                          return (
                            <div className="variant-container">
                              {name && <p>Name: {name}</p>}
                              {amount && <p>Amount: {amount}</p>}
                            </div>
                          );
                        })}
                      </p>
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <h1>There is no user to show user data ! </h1>
      )}
    </div>
  );
};

export default AdminDashbord;
