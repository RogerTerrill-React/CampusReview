const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

const generateRandomReviews = (firebase) => {
  let scoreArray = [];

  const reviews = [
    'Great campus with fabulous faculty and diverse group of students. Always something to do. Enjoyed the aura of the campus during my duration here. Lively and safe environment! Definitely would recommend.',
    "Most of the students here keep to themselves. Joining clubs, organizations and etc are great ways to make friends. The opportunities here are good. Some of them aren't advertised to a lot of students. Take advantage of the career events and workshops. Definitely, keep up with CSULB social media cause they have cool events &amp; important infos.",
    "Excellent teachers, excellent facilities. The campus is large, beautiful and easily accessible by buses. Staff and students are really friendly and helpful and there are plenty of helpful resources. Plenty of clubs/societies to choose from. Thoroughly enjoyed my time studying here and I'm glad to have chosen to study here. Go Beach!",
    "Good school if you like the outdoors, have more liberal views, and enjoy cold misty foggy weather with a sprinkle of heat wave days here and there. All the profs are either obsessed with their job or don't care at all. The clubs are diverse and cool. Dorms amazingly tiny and cramped and the school is very spread out and classes are miles apart.",
    'Peaceful, great weather, loving, everyone is really nice, community is amazing, very outdoorsy, love to hear the sound of the ocean while doing homework, everything was fantastic about this school.',
    "The food needs work I won't lie. The facilities are nice, many of them are new and in construction. It is a small campus so it is very social and easy to make friends in my opinion, though a certain amount of effort is necessary of course. The clubs are small but so is the school so that's to be expected. Love the energy and quaintness here.",
    "This school is riding on reputation alone, which it falls very short of. Nobody is there to help you graduate in four years. All their promises are lies and the administration is not there to help you in anyway. Out of all the classes I've taken there are two professors that I have any respect for. If you got into a different school, go there.",
    'Nice campus and academics are OK to good (though degree progress is slowed due to abundant prereqs), but everything else is horrid. Unhelpful and apathetic faculty, especially towards state nonresidents. Parking, food, and other amenities are costly yet subpar. Basic tasks eg. class signups are made tedious or difficult. Overcrowded.',
    "It is up to you to be as involved as you want. If you get involved, there are opportunities for everyone, but everyone I know that hasn't been in any extracurriculars ends up hating it. Most of my professors are good but I have had some terrible experiences with some staff being cold/unhelpful. 30 mins away from almost anything (beach, food, etc.)",
    'The campus is not too far from food and grocery stores, about 15 to 20 minutes away. I lived on campus, the campus experience has elevated and the suites are a good option for upperclassmen. The parking is a major problem. Make sure to get to campus early. Use the resources that the campus provides. Reach out to professors and staff for internships',
  ];

  const campusesUids = [
    '-MI2AyHbeuWe89Dd-ZvN',
    '-MI2BISs2izvrWf44_jc',
    '-MI2BigPXog_1z-mFFDU',
    // '-MI2C6d8Z1hUt7uI_9gw',
    '-MI64aUpC2_pGxPwi8oe',
  ];

  const userUids = [
    'CRznvSSF4ndJNhiD0ljBwak8DOo2',
    'GeN48r0mTqeNqDfMC9NaNPfZZjf1',
    'LbKWlNmlpHWIlaNrcnJOimjOvwx2',
    'dKN2HpZkv5ZcOjf3Ly53ULtqY7V2',
    'k2I6celqhwShzVRtsbh3hs2GwDf1',
    'l5VdVKSC1sXr8ahxoEZmhKAeCQo1',
    'rTja0cf5uggkMAChlpQcG7vIDag1',
    'rhtalHz1kJep8FgprIpFBBC6Ptm2',
    'u0SmWjPJrXhfoVCnc2H5bX70pvB2',
  ];

  const year = ['2016', '2017', '2018', '2019', '2020'];

  for (let i = 0; i < campusesUids.length; i++) {
    for (let j = 0; j < reviews.length; j++) {
      scoreArray.push(randomNumber(1, 5));
    }

    console.log(campusesUids[i], average(scoreArray));

    for (let j = 0; j < reviews.length; j++) {
      firebase.campusReviews(campusesUids[i]).push({
        userId: userUids[Math.floor(Math.random() * userUids.length)],
        score: scoreArray[j],
        review: reviews[Math.floor(Math.random() * reviews.length)],
        startYear: year[Math.floor(Math.random() * year.length)],
        endYear: year[Math.floor(Math.random() * year.length)],
        createdAt: firebase.serverValue.TIMESTAMP,
      });
    }
    scoreArray = [];
  }
};

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export { average, generateRandomReviews };
