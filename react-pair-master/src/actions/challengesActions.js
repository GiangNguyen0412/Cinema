
export function getChallenges() {
  /*const challenges = fetch(`${process.env.API_HOST}/api/v1/challenges`).then(res => {
    return res.json()
  }).then(res => {
    return res
  })*/

  const challenges = [
    {
      id: 1,
      title: 'test room 1 nhé',
      description: 'Chào mừng các bạn đến với room 1:'
    }
  ];
  return {type: "GET_CHALLENGES", payload: challenges}
}