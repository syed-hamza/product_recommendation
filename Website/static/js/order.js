function cancelOrder(index) {
    // Assuming 'categories' is the array containing your products
    const productToCancel = categories[index];

    // Display a form asking for the reason for cancellation
    const reason = prompt("Please provide the reason for cancellation:");

    if (reason !== null) { // User clicked 'OK' in the prompt
        // Update the product's status and reason
        productToCancel.status = "Cancelled";
        productToCancel.cancellationReason = reason;

        // Remove the item from the order page
        categories.splice(index, 1);
        
        // Update the UI
        displaycart();

        // Optionally, you may want to send the cancellation information to the server
        // using an AJAX request or other appropriate method.
    } else {
        // User clicked 'Cancel' in the prompt, do nothing
    }
}


