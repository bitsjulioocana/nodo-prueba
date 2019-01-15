const logic_test = require('./logic-test');

test('listTeamsByCountry', () => {
  let listTeamsByCountry = logic_test.listTeamsByCountry();
  expect(listTeamsByCountry[0].country).toEqual('England');
  expect(listTeamsByCountry[1].country).toEqual('England');
  expect(listTeamsByCountry[2].country).toEqual('England');
  expect(listTeamsByCountry[3].country).toEqual('France');
  expect(listTeamsByCountry[4].country).toEqual('Germany');
  expect(listTeamsByCountry[5].country).toEqual('Germany');
});