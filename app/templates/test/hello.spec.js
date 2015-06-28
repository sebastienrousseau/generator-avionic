function Greeter(){
    this.greeting = "Hello, Avionic ✈";
};

describe("Greeter", function(){
    var greeter = new Greeter();
    it("says Hello, Avionic ✈", function(){
        expect(greeter.greeting).toBe("Hello, Avionic ✈")
    })
});
