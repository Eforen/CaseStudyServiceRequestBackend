import RamDatabase, { CurrentStatus } from './Database'

let Database = new RamDatabase()

function assertMethod(name: string){
  it(`Should have a method called ${name}`, () => {
    // @ts-ignore
    expect(Database[name]).toBeDefined()
  })
}

let guids = [
  "8652a9f0-8bc2-4331-97ef-82599051e055",
  "8d9f6653-0adc-4c3d-b2c6-df926a245ca7",
  "4d954774-8296-4fc9-a8de-01aff3c2d4c7",
  "8689be4f-07de-440a-a9bd-ac307d7f99c4",
  "8c1eba89-daf1-4bdb-a01b-32f6e44d7181"
]

let sampleDataProvided = {
  "buildingCode": "COH",
  "description" : "Please turn up the AC in suite 1200D. It is too hot here.",
  "currentStatus" : CurrentStatus.Created,
  "createdBy": "Nik Patel",
  "createdDate" : new Date("2019-08-01T14:25:43.511Z").valueOf(),
  "lastModifiedBy" : "Jane Doe",
  "lastModifiedDate" : new Date("2019-08-01T15:01:23.511Z").valueOf()
}

let sampleDataAlt = {
  "buildingCode": "MER",
  "description" : "Qui nostrud cupidatat irure labore officia dolore dolore adipisicing excepteur est culpa mollit.",
  "currentStatus" : CurrentStatus.InProgress,
  "createdBy": "Yolo molo",
  "createdDate" : new Date("2025-08-01T14:25:43.511Z").valueOf(),
  "lastModifiedBy" : "Jane Doe",
  "lastModifiedDate" : new Date("2025-08-01T15:01:23.511Z").valueOf()
}

describe('Database', () => {
  assertMethod('create')
  assertMethod('update')
  assertMethod('delete')
  assertMethod('all')
  assertMethod('clear')

  const testStore = async () => {
    Database.clear()
    expect((await Database.all()).length).toEqual(0)
    Database.create({
      ...sampleDataProvided
    })

    var data = await Database.all()
    expect(data.length).toEqual(1)
    expect(data[0].id).not.toBeNull()
    expect(data[0].id.length).toBeGreaterThan(30)
    expect(data[0].buildingCode).toBe(sampleDataProvided.buildingCode)
    expect(data[0].createdBy).toBe(sampleDataProvided.createdBy)
    expect(data[0].createdDate).toBe(sampleDataProvided.createdDate)
    expect(data[0].currentStatus).toBe(sampleDataProvided.currentStatus)
    expect(data[0].description).toBe(sampleDataProvided.description)
    expect(data[0].lastModifiedBy).toBe(sampleDataProvided.lastModifiedBy)
    expect(data[0].lastModifiedDate).toBe(sampleDataProvided.lastModifiedDate)

    Database.create({
      ...sampleDataAlt
    })

    expect(data.length).toEqual(2)
    expect(data[1].id).not.toBeNull()
    expect(data[1].id.length).toBeGreaterThan(30)
    expect(data[1].buildingCode).toBe(sampleDataAlt.buildingCode)
    expect(data[1].createdBy).toBe(sampleDataAlt.createdBy)
    expect(data[1].createdDate).toBe(sampleDataAlt.createdDate)
    expect(data[1].currentStatus).toBe(sampleDataAlt.currentStatus)
    expect(data[1].description).toBe(sampleDataAlt.description)
    expect(data[1].lastModifiedBy).toBe(sampleDataAlt.lastModifiedBy)
    expect(data[1].lastModifiedDate).toBe(sampleDataAlt.lastModifiedDate)
  }
  it('store', async done => {
    await testStore()
    done()
  })

  it('has', async done => {
    await testStore()
    const data = await Database.all()
    expect(data.length).toEqual(2)
    let dataIDs: string[] = []
    for(let i = 0; i < data.length; i++){
      dataIDs.push(data[i].id)
      expect(Database.has(data[i].id)).toBeTruthy()
    }
    for (let i = 0; i < guids.length; i++) {
      const guid = guids[i];
      expect(await Database.has(guid)).toEqual(dataIDs.indexOf(guid) != -1)
    }
    done()
  })

  it('findOne', async done => {
    await testStore()
    const data1 = await Database.findOne({createdBy: sampleDataProvided.createdBy})
    const data2 = await Database.findOne({buildingCode: sampleDataProvided.buildingCode})
    const data3 = await Database.findOne({description: sampleDataProvided.description})
    
    expect(data1).not.toBeUndefined()
    expect(data2).not.toBeUndefined()
    expect(data3).not.toBeUndefined()

    expect(data1).toEqual({...sampleDataProvided, id: data1?.id})
    expect(data2).toEqual({...sampleDataProvided, id: data2?.id})
    expect(data3).toEqual({...sampleDataProvided, id: data3?.id})
    done()
  })

  it('find many', async done => {
    await testStore()
    
    await Database.create({...sampleDataProvided, createdBy: guids[0]})
    await Database.create({...sampleDataProvided, createdBy: guids[0]})
    await Database.create({...sampleDataProvided, createdBy: guids[0]})
    await Database.create({...sampleDataProvided, createdBy: guids[1]})
    await Database.create({...sampleDataProvided, createdBy: guids[1]})
    await Database.create({...sampleDataProvided, createdBy: guids[2]})

    //TODO: Check that the find method returns all the stuffs
    var data0 = await Database.find({createdBy: guids[0]})
    var data1 = await Database.find({createdBy: guids[1]})
    var data2 = await Database.find({createdBy: guids[2]})
    var data3 = await Database.find({createdBy: guids[0]})
    await Database.create({...sampleDataProvided, createdBy: guids[0]})
    await Database.create({...sampleDataProvided, createdBy: guids[0]})
    await Database.create({...sampleDataProvided, createdBy: guids[0]})
    var data4 = await Database.find({createdBy: guids[0]})

    expect(data0.length).toEqual(3)
    expect(data1.length).toEqual(2)
    expect(data2.length).toEqual(1)
    expect(data3.length).toEqual(3)
    expect(data4.length).toEqual(6)
    done()
  })
})
