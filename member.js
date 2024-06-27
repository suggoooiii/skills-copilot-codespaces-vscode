function skillsMember(){
    var member = {
        name: 'John Doe',
        age: 30,
        skills: ['javascript', 'html', 'css'],
        details: function(){
            console.log(this.name + ' is ' + this.age + ' years old.');
        }
    }
    return member;
}