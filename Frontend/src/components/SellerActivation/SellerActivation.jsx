import React from 'react'

function SellerActivation({ error }) {
    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {error ? (
                <p>Your token is expired</p>
            ) : (
                <p>Your account has been created successfully</p>
            )}
        </div>
    )
}

export default SellerActivation