const {CarsController} = require("../../src/controllers/CarsController.js");

const carsController = new CarsController()


describe("Add, get, delete cars", () => {
    beforeAll(async () => {
        await carsController.login()
    })

    afterAll(async () => {
        let response = await carsController.getUserCars()
        let carsId = response.data.data.map((car) => car.id)
        for(let carId of carsId){
            let response = await carsController.deleteCarById(carId)
        }
    })

    test("Get cars by brand", async () => {
        let response = await carsController.getCarsBrand()
        expect(response.status).toBe(200)
    })

    test("Add new car", async () => {
        let response = await carsController.getUserCars()
        let carList = [...response.data.data]
        let newCarResponse = await carsController.addCar(1, 1, 35)
        response = await carsController.getUserCars()
        let newCarsList = response.data.data
        expect(newCarsList.length).toBe(carList.length + 1)
        expect(newCarsList.find((car) => car.id === newCarResponse.data.data.id)).toBeDefined()
    })

    test("Add Porsche 911", async () => {
        let response = await carsController.addCar(4, 16, 7)
        let cars = await carsController.getUserCars()
        cars = response.data.data
        expect(cars.mileage).toBe(7)
    })

    test("Add BMW Z3", async () => {
        let response = await carsController.addCar(2, 10, 10)
        let car = await carsController.getUserCars()
        car = response.data.data
        expect(car.model).toBe("Z3")
    })

    test("Add Fiat Ducato", async() => {
        let response = await carsController.addCar(5, 23, 115)
        let car = await carsController.getUserCars()
        car = response.data.data
        expect(car.brand).toBe("Fiat")
    })

    test("Add Ford", async () => {
        let response = await carsController.addCar(3, 11, 150)
        let car = await carsController.getUserCars()
        car = response.data.data
        expect(car.model).toBe("Fiesta")
    })

    test("Add car with no existing brand", async () => {
        let response = await carsController.addCar(6, 1, 150)
        let car = await carsController.getUserCars()
        car = response.data.data
        expect(car).toBeUndefined()
    })

    test("Add car with no existing model", async () => {
        let response = await carsController.addCar(1, 28, 1002)
        let car = await carsController.getUserCars()
        car = response.data.data
        expect(car).toBeUndefined()
    })

    test("Check that mileage should be numeric value", async () => {
        let response = await carsController.addCar(1, 3, "some value")
        let car = await carsController.getUserCars()
        car = response.data.data
        expect(car).toBeUndefined()
    })

})
