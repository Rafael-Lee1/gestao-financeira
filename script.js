$(document).ready(function() {
    let balance = 0;
    const transactions = [];

    function addTransaction() {
        const description = $('#descriptionInput').val();
        const amount = parseFloat($('#amountInput').val());

        if (description && !isNaN(amount)) {
            const transaction = {
                description: description,
                amount: amount
            };

            transactions.push(transaction);
            updateBalance();
            updateTransactionList();

            $('#descriptionInput').val('');
            $('#amountInput').val('');
        }
    }

    function updateBalance() {
        balance = transactions.reduce((total, transaction) => total + transaction.amount, 0);
        $('#balanceAmount').text(balance.toFixed(2));
    }

    function updateTransactionList() {
        $('#transactionList').empty();

        transactions.forEach(function(transaction, index) {
            const transactionItem = `
                <li class="transaction-item">
                    <span>${transaction.description}</span>
                    <span>${transaction.amount.toFixed(2)}</span>
                    <button class="deleteTransactionButton" data-index="${index}">Excluir</button>
                </li>
            `;

            $('#transactionList').append(transactionItem);
        });
    }

    $('#addTransactionButton').click(function() {
        addTransaction();
    });

    $('#amountInput').keypress(function(e) {
        if (e.which === 13) {
            addTransaction();
        }
    });

    $('#transactionList').on('click', '.deleteTransactionButton', function() {
        const index = $(this).data('index');
        transactions.splice(index, 1);
        updateBalance();
        updateTransactionList();
    });
});
