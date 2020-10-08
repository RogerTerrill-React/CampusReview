import { average, randomNumber } from './array';

const campusesUids = [
  '-MI2AyHbeuWe89Dd-ZvN', // Bakersfield
  '-MI2BISs2izvrWf44_jc', // Dominguez Hills
  '-MI2BigPXog_1z-mFFDU', // Channel Islands
  '-MI2C6d8Z1hUt7uI_9gw', // Monterey Bay
  '-MI64aUpC2_pGxPwi8oe', // Pomona
  '-MIzpKOdcBZhL_COijXl', // Chico
  '-MIzptmj-aHWVAR6KqUM', // East Bay
  '-MIzqfGubJbhQB-wEAe9', // Fresno
  '-MIzrG1g72fgCfXn-VyS', // Fullerton
  '-MIzsHNeNEJExrcsvkh3', // Humboldt
  '-MIzuGL4YCh59wa-mkgB', // Long Beach
  '-MIzujWg8oo-45nrNqSZ', // Los Angeles
  '-MIzvl4oLNWZP27NJqIK', // Maritime
  '-MIzwMEo9vRatw7K1uM6', // Northridge
  '-MIzwxUiQTxwlGWxnavj', // Sacramento
  '-MIzxQoteKHV0reQPCup', // San Bernardino
  '-MIzxv8BeHyW3m8z-LE2', // San Diego
  '-MIzyXhulRFM-a8JIKRT', // San Francisco
  '-MIzz2AVOWOBycq9iHUa', // San Jose
  '-MJ-2i-z3xdYoieOBxkg', // San Luis Obispo
  '-MJ-5cW2KIWKMnl5A28x', // San Marcos
  '-MJ-68TKI37FwPRUqNKW', // Sonoma
  '-MJ-6YKCOr-5YHPzENzZ', // Stanislaus
];

const majorsUids = [
  '-MI67lEWmUD3Gqd8Dt8Y',
  '-MI683qcNfBz99Qn_9lH',
  '-MI6nX2RERrXI80b2gWj',
  '-MIrYTQoAY-I2f4gyVb_',
  '-MIrZuZ5NsJfy4zMi4Ly',
  '-MJ-DBczcC9F8SGzKRTh',
  '-MJ-Dt-AUlwfJAyLuutd',
  '-MJ-ECv43BFoDPpucY2m',
  '-MJ-FqyYCTZXrY_t57yj',
  '-MJ-GJZugDrrJyPxtAIY',
  '-MJ-HDPB0tHr86iRRwVj',
  '-MJ-Hd3j8dJLggXdSHtf',
  '-MJ-HvsBUoig2i0dGziw',
  '-MJ-I9ldrOv11rwmQsQt',
  '-MJ-I_DoTYrQ91WQz4Of',
  '-MJ-IqBqgIGnuj155n2j',
  '-MJ-JNWnr27UaCpKr9_S',
  '-MJ-Ji97w7k0yBCGO4xm',
  '-MJ-K6xPURq8s8zTZra2',
  '-MJ-Kbzk71jIfQxXLEDf',
  '-MJ-KpdZZwnR9LNNgVvP',
];

const coursesUids = [
  '-MJ40OcXtScp-2GlhgIA',
  '-MJ40ES2PVS3o036zQHj',
  '-MJ407WaMZWhvfJjiyJN',
  '-MJ401C6oJRuAvrK6isl',
  '-MJ4-t3xsoWsKzAv1gAE',
  '-MJ4-mpFkvrCq11st2K9',
  '-MJ4-gEKb8g3LQSlsJ0L',
  '-MJ4-_EOmqt3EqT9o2BK',
  '-MJ4-TwONMuZeAcJq5Cf',
  '-MJ4-MuLR-JmNDDsAlSH',
  '-MJ4-DccaGK4nJakGi10',
  '-MJ4-6bsE3WijTsjFsty',
  '-MJ3zyV1ODDoWmR82oGD',
  '-MJ3zpzEsJ2SpWBVQg3d',
  '-MJ3zitWXss-v_Iq7GSy',
  '-MJ3zbxlYCKu80MUH1Zo',
  '-MJ3zMXQX71vhUcxRM8a',
  '-MJ3z9pbOYpwBx0dQJtY',
  '-MJ3z3X7G-YRmYdw4amX',
  '-MJ3yxdY6ZiHdXLLm2z-',
  '-MJ3yi7cP7r5cmXqf63K',
  '-MJ3yJJNZQyfcAjT22Xb',
  '-MJ3y9XH-qFg26wtlAE1',
  '-MJ3y1Sb9ramQgKuWXoW',
  '-MJ3xuq87D2qNWanUMgN',
  '-MJ3xobo_ZRVqlx37UOH',
  '-MJ3xhMsdpYi-Yb2rZQw',
  '-MJ3xHeLyEtTgZjNfZ8F',
  '-MJ3xA8OBxlLUBTKAd6r',
  '-MJ3x0uSqF8JAw8ElbTE',
  '-MJ3wkYB37MebSkguLXR',
  '-MJ3wS2AnXjNTBFBgaL0',
  '-MIrSD5tHxckexP9SZj6',
  '-MIrS4mdFyoOzwZSdNGV',
  '-MIrRovRjh7755ztbIIz',
  '-MIrRe9ZQ_O-KI6rHdsx',
  '-MIrRWaRjIwDUWs8D1mz',
  '-MIrRCrv3Dc1Pi9YFIw3',
  '-MIrR3R3e_GfBTm0YrV8',
  '-MIrQudw2ta4h18Gb97q',
  '-MIrQZfaDM6h8mA91Izl',
  '-MIrQMc90t9_HEnOkCz1',
  '-MIrQED-PEiAisY_-O52',
  '-MIrQ039zpcVTKHk12Fq',
  '-MIrPqd8boXCu2debbIi',
  '-MIrPSL3NLi2ijE37J9x',
  '-MIrP9SQ3SddIwL6zluq',
  '-MIrOb5baq4a6FTncORp',
  '-MIGUj2MQjCXQg0ieOlJ',
  '-MIGPkhlb_B-JWGcAgW-',
  '-MI7DIBeepBNR-9XGrbm',
];

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
const month = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const generateRandomCampusReviews = (firebase) => {
  let scoreArray = [];

  for (let i = 0; i < campusesUids.length; i++) {
    for (let j = 0; j < reviews.length; j++) {
      scoreArray.push(randomNumber(1, 5));
    }

    for (let j = 0; j < reviews.length; j++) {
      firebase.campusReviews(campusesUids[i]).push({
        userId: userUids[Math.floor(Math.random() * userUids.length)],
        score: scoreArray[j],
        review: reviews[Math.floor(Math.random() * reviews.length)],
        startYear: year[Math.floor(Math.random() * year.length)],
        endYear: year[Math.floor(Math.random() * year.length)],
        createdAt: firebase.serverValue.TIMESTAMP,
      });

      firebase.campus(campusesUids[i]).update({
        averageScore: average(scoreArray),
      })
    }
    scoreArray = [];
  }
};

const generateRandomMajorReviews = (firebase) => {
  // Iterate through each campus
  for (let i = 0; i < majorsUids.length; i++) {
    // For that campus, go through each major
    for (let j = 0; j < campusesUids.length; j++) {
      // Add review for each major for each campus
      for (let k = 0; k < reviews.length; k++) {
        firebase.majorReviews(majorsUids[i]).push({
          campusUid: campusesUids[j],
          userId: userUids[Math.floor(Math.random() * userUids.length)],
          score: randomNumber(1, 5),
          review: reviews[Math.floor(Math.random() * reviews.length)],
          startYear: year[Math.floor(Math.random() * year.length)],
          endYear: year[Math.floor(Math.random() * year.length)],
          createdAt: firebase.serverValue.TIMESTAMP,
        });
      }
    }
  }
};

const generateRandomCourseReviews = (firebase) => {
  let scoreArray = [];

  for (let i = 0; i < coursesUids.length; i++) {
    for (let j = 0; j < reviews.length; j++) {
      scoreArray.push(randomNumber(1, 5));
    }

    for (let j = 0; j < reviews.length; j++) {
      firebase.courseReviews(coursesUids[i]).push({
        userId: userUids[Math.floor(Math.random() * userUids.length)],
        score: scoreArray[j],
        review: reviews[Math.floor(Math.random() * reviews.length)],
        month: month[Math.floor(Math.random() * month.length)],
        year: year[Math.floor(Math.random() * year.length)],
        createdAt: firebase.serverValue.TIMESTAMP,
      });

      firebase.course(coursesUids[i]).update({
        averageScore: average(scoreArray),
      })
    }
    scoreArray = [];
  }
};

export {
  generateRandomCampusReviews,
  generateRandomMajorReviews,
  generateRandomCourseReviews,
};
