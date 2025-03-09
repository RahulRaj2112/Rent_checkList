document.addEventListener("DOMContentLoaded", function() {
    let totalBalance = Array.from(document.querySelectorAll(".amount"))
        .map(td => parseFloat(td.textContent))
        .reduce((a, b) => a + b, 0);
    
    const balanceDisplay = document.getElementById("balance");
    balanceDisplay.textContent = totalBalance;
    
    const checkboxes = document.querySelectorAll(".rent-checkbox");
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const resetPopup = document.getElementById("reset-popup");
    const resetButton = document.getElementById("reset-button");
    const yesReset = document.getElementById("yes-reset");
    const noReset = document.getElementById("no-reset");
    let currentCheckbox = null;

    function updateBalance() {
        let paidAmount = Array.from(checkboxes).reduce((sum, checkbox) => {
            if (checkbox.checked) {
                return sum + parseFloat(checkbox.closest("tr").querySelector(".amount").textContent);
            }
            return sum;
        }, 0);
        balanceDisplay.textContent = totalBalance - paidAmount;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            const row = checkbox.closest("tr");
            row.classList.toggle("highlight", checkbox.checked);
        });
    });

    resetButton.addEventListener("click", function() {
        resetPopup.style.display = "block";
        overlay.style.display = "block";
    });

    yesReset.addEventListener("click", function() {
        localStorage.clear();
        location.reload();
    });

    noReset.addEventListener("click", function() {
        resetPopup.style.display = "none";
        overlay.style.display = "none";
    });

    updateBalance();
});
