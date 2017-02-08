module.exports = {
    user: function() {
        var response = {
            name: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            team: 'TeamExample'
        }

        return JSON.stringify(response);
    }
}
