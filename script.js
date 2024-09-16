
        const days = ['Sunday', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        const today = new Date();
        const dayOfWeek = days[today.getDay()];
        const dayOfMonth = today.getDate();
        const month = months[today.getMonth()];
        

        const dateDisplay = document.getElementById('dateDisplay');
        dateDisplay.textContent = dayOfWeek + ' ' + dayOfMonth + ', ' + month ;

        // Запрос к API OpenWeatherMap
        const api_key = '16e6d89d1a356ebab71e8feb97dc49c0'; // Замените на свой API ключ
        const city = 'Severodvinsk';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
        const apiURL =`http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}`


        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const temperatureDisplay = document.getElementById('temperature');
                const roundedTemperature = Math.round(data.main.temp); // Округляем температуру до ближайшего целого числа
                temperatureDisplay.textContent = roundedTemperature + '°C';
            
                // Определение времени суток
                const currentHour = new Date().getHours();
                let timeOfDay;
                if (currentHour >= 6 && currentHour < 18) {
                    timeOfDay = 'day';
                } else {
                    timeOfDay = 'evening';
                }

                // Определение погоды и установка соответствующего фона
                const weatherCondition = data.weather[0].main;
                const body = document.getElementsByTagName('body')[0];

                if (weatherCondition === 'Clear') {
                    if (timeOfDay === 'day') {
                        body.style.backgroundImage = "url('images/clearsky.jpg')";
                    } else {
                        body.style.backgroundImage = "url('images/clearsky.jpg')";
                    }
                } 
                else if (weatherCondition === 'Rain') {
                    if (timeOfDay === 'day') {
                        body.style.backgroundImage = "url('images/rain.jpg')";
                    } else {
                        body.style.backgroundImage = "url('images/rainevening.jpg')";
                    }
                } 
                else if (weatherCondition === 'Clouds') {
                    if (timeOfDay === 'day') {
                        body.style.backgroundImage = "url('images/clouds.jpg')";
                    } else {
                        body.style.backgroundImage = "url('images/cloudsevening.jpg')";
                    }
                }
                else if (weatherCondition === 'Snow') {
                    if (timeOfDay === 'day') {
                        body.style.backgroundImage = "url('images/clearsky.jpg')";
                    } else {
                        body.style.backgroundImage = "url('images/clearsky.jpg')";
                    }
                }
                else if (weatherCondition === 'Thunderstorm') {
                    if (timeOfDay === 'day') {
                        body.style.backgroundImage = "url('images/clearsky.jpg')";
                    } else {
                        body.style.backgroundImage = "url('images/clearsky.jpg')";
                    }
                }
                else if (weatherCondition === 'Drizzle') {
                    if (timeOfDay === 'day') {
                        body.style.backgroundImage = "url('images/clearsky.jpg')";
                    } else {
                        body.style.backgroundImage = "url('images/clearsky.jpg')";
                    }
                }

                const apiKey = 'f3e3274f47ac4ea790d5675e13641b6d';
                
                const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`;

                fetch(geocodingUrl)
        .then(response => response.json())
        .then(geocodingData => {
          const latitude = geocodingData.results[0].geometry.lat;
          const longitude = geocodingData.results[0].geometry.lng;

          const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
            
          fetch(airPollutionUrl)
            .then(response => response.json())
            .then(airPollutionData => {
              const airQualityElement = document.getElementById('airQualityValue');
              const airQualityValue = airPollutionData.list[0].main.aqi;

              if (airQualityValue === 1) {
                airQualityElement.textContent = 'Отличное';
              } else if (airQualityValue === 2) {
                airQualityElement.textContent = 'Хорошее';
              } else if (airQualityValue === 3) {
                airQualityElement.textContent = 'Удовлетворительное';
              } else if (airQualityValue === 4) {
                airQualityElement.textContent = 'Плохое';
              } else if (airQualityValue === 5) {
                airQualityElement.textContent = 'Очень плохое';
              } else {
                airQualityElement.textContent = airQualityValue;
              }
              console.log('Качество воздуха', airPollutionData)
            })
            
            .catch(error => {
              console.error('Error fetching air pollution data:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching geocoding data:', error);
        });
    
                
                console.log('Текущая погода:', data.weather[0].main); // Вывод основного состояния погоды
                console.log('Описание:', data.weather[0].description); // Вывод более подробного описания погоды 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
            
