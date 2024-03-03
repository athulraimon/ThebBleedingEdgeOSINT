function openScan() {
    window.location.href = '/Scans';
}
function openNewScan() {
    window.location.href = '/';
}

const landing = {
        el: '#osi',
        data() {
            return {
                info: [],
                scanName: [],
                firstName: [],
                lastName: [],
                usernameInput: [],
                ipInput: [],
                emailInput: [],
                phoneInput: [],
                imageData: null,
                selectedScanType: 0,
                showScrollableSection: true,
                nameList: [],
                name2List: [],
                usernameList: [],
                websiteInput: [],
                breachEmailInput: [],
                cryptoInput:[],
                locList: [],
                phoneList: [],
                breachList: [],
                cryptoList:[],
                history: JSON.parse(localStorage.getItem('nameScanHistory')) || [],
                historyDetails: [],
                htmlcontent: null,

            };
        },

        mounted() {
            // Fetch data from the file when the component is mounted
        },

        methods: {


            handleImageUpload(event) {
                const file = event.target.files[0];

                if (file) {
                    // Use FileReader to read the contents of the image file
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        // Store the image data in the imageData property
                        this.imageData = e.target.result;
                    };

                    reader.readAsDataURL(file);
                }
            },


            async startNameScan() {



                if (this.firstName && this.lastName) {
                    const fn = this.firstName;
                    const ln = this.lastName;

                    try {
                        const response = await fetch(`http://localhost:5001/google-dork/cv/${fn}/${ln}`);
                        const data = await response.json();
                        console.log(data);
                        const formattedEvents = [];
                        data.forEach(event => {
                            // Format the event data as needed
                            var iter = {
                                position: event.position,
                                title: event.title,
                                link: event.link,
                                snippet: event.snippet,
                                source: event.source,
                                type: this.selectedScanType
                            };

                            formattedEvents.push(
                                iter
                            );
                        });

                        this.nameList = formattedEvents;
                        if (this.scanName) {
                            localStorage.setItem(this.scanName, JSON.stringify(formattedEvents));
                            const list = JSON.parse(localStorage.getItem('nameScanHistory')) || [];
                            list.push(this.scanName);
                            localStorage.setItem('nameScanHistory', JSON.stringify(list));

                        }// ... rest of the code
                    } catch (error) {
                        console.error('Error making API call:', error);
                    }
                }

            },

            async startEmailScan() {

                console.log(this.emailInput);

                if (this.emailInput) {
                    const email = this.emailInput;

                    try {
                        const response = await fetch(`http://localhost:5001/get-user-data/${email}`);
                        const data = await response.json();
                        console.log(data);
                        const formattedEvents = [];
                        this.htmlcontent = await fetch(`http://localhost:5001/get-email-map/${email}`);
                        console.log(this.htmlcontent);


                    } catch (error) {
                        console.error('Error making API call:', error);
                    }
                }

            },

            async startUsernameScan() {

                if (this.usernameInput) {
                    const un = this.usernameInput;

                    try {
                        const response = await fetch(`http://localhost:5001/google-dork/${un}`);
                        const data = await response.json();
                        console.log(data);
                        const formattedEvents = [];
                        data.forEach(event => {
                            // Format the event data as needed
                            var iter = {
                                position: event.position,
                                title: event.title,
                                link: event.link,
                                source: event.source,
                                type: this.selectedScanType
                            };

                            formattedEvents.push(
                                iter
                            );
                        });
                        this.usernameList = formattedEvents;
                        if (this.scanName) {
                            localStorage.setItem(this.scanName, JSON.stringify(formattedEvents));
                            const list = JSON.parse(localStorage.getItem('nameScanHistory')) || [];
                            list.push(this.scanName);
                            localStorage.setItem('nameScanHistory', JSON.stringify(list));

                        }

                    } catch (error) {
                        console.error('Error making API call:', error);
                    }
                }

            },

            async startSocialScan() {

                if (this.usernameInput) {
                    const fn = this.firstName;
                    const ln = this.lastName;
                    const w = this.websiteInput;

                    try {
                        const response = await fetch(`http://localhost:5001/google-dork/${w}/${fn}/${ln}`);
                        const data = await response.json();
                        console.log(data);
                        const formattedEvents = [];
                        data.forEach(event => {
                            // Format the event data as needed
                            var iter = {
                                position: event.position,
                                title: event.title,
                                link: event.link,
                                source: event.source,
                                type: this.selectedScanType
                            };

                            formattedEvents.push(
                                iter
                            );
                        });
                        this.name2List = formattedEvents;
                        if (this.scanName) {
                            localStorage.setItem(this.scanName, JSON.stringify(formattedEvents));
                            const list = JSON.parse(localStorage.getItem('nameScanHistory')) || [];
                            list.push(this.scanName);
                            localStorage.setItem('nameScanHistory', JSON.stringify(list));

                        }

                    } catch (error) {
                        console.error('Error making API call:', error);
                    }
                }

            },

            async startIpScan() {

                if (this.ipInput) {
                    const ip = this.ipInput;
                    try {
                        const response = await fetch(`http://localhost:5001/get-loc-from-ip/${ip}`);
                        const data = await response.json();
                        console.log(data);
                        const formattedEvents = [];
                        data.forEach(event => {
                            // Format the event data as needed
                            var iter = {
                                calling_code: event.calling_code,
                                city: event.city,
                                continent: event.continent,
                                country: event.country,
                                flag: event.flag.img,
                                latitude: event.latitude,
                                longitude: event.longitude,
                                postal: event.postal,
                                region: event.region,
                                type: this.selectedScanType
                            };

                            formattedEvents.push(
                                iter
                            );
                        });
                        this.locList = formattedEvents;
                        if (this.scanName) {
                            localStorage.setItem(this.scanName, JSON.stringify(formattedEvents));
                            const list = JSON.parse(localStorage.getItem('nameScanHistory')) || [];
                            list.push(this.scanName);
                            localStorage.setItem('nameScanHistory', JSON.stringify(list));

                        }

                    } catch (error) {
                        console.error('Error making API call:', error);
                    }
                }

            },

            async startBreachScan() {

                if (this.breachEmailInput) {
                    const b = this.breachEmailInput;
                    try {
                        const response = await fetch(`http://localhost:5001/get-email-leak/${b}`);
                        const data = await response.json();
                        console.log(data);
                        const formattedEvents = [];
                        data.forEach(event => {
                            // Format the event data as needed
                            var iter = {
                                database_name: event.database_name,
                                email: event.email,
                                hashed_password: event.hased_password,
                                
                            };

                            formattedEvents.push(
                                iter
                            );
                        });
                        this.breachList = formattedEvents;
                        console.log(this.breachList);
                       

                    } catch (error) {
                        console.error('Error making API call:', error);
                    }
                }

            },

          

            async startCryptoScan() {

                if (this.cryptoInput) {
                    const c = this.cryptoInput;
                    try {
                        const response = await fetch(`http://localhost:5001/get-bitcoin-trans/${c}`);
                        const data = await response.json();
                        console.log(data);
                        const formattedEvents = [];
                        data['inbound'].forEach(event => {
                            // Format the event data as needed
                            var iter = {
                                transaction:"Incoming",
                                amount: event.amount,
                                receiver: event.receiver.address,
                                sender: event.sender.address,


                            };

                            formattedEvents.push(
                                iter
                            );
                        });
                        data['outbound'].forEach(event => {
                            // Format the event data as needed
                            var iter = {
                                transaction:"Outgoing",
                                amount: event.amount,
                                receiver: event.receiver.address,
                                sender: event.sender.address,

                            };

                            formattedEvents.push(
                                iter
                            );
                        });
                        this.cryptoList = formattedEvents;
                        console.log(this.cryptoList);


                    } catch (error) {
                        console.error('Error making API call:', error);
                    }
                }

            },

            async startPhoneScan() {

                if (this.phoneInput) {
                    const phone = this.phoneInput;
                    try {
                        const response = await fetch(`http://localhost:5001/get-loc-from-phone/${phone}`);
                        const data = await response.json();
                        
                        const formattedEvents = [];
                        data.forEach(event => {
                            // Format the event data as needed
                            var iter = {
                                carrier: event.carrier_name,
                                country: event.mobile_country_code,
                                network: event.mobile_network_code,

                            };

                            formattedEvents.push(
                                iter
                            );
                        });
                        

                        this.phoneList = formattedEvents;

                    } catch (error) {
                        console.error('Error making API call:', error);
                    }
                }

            },

            retrieveHistory(name) {
                this.historyDetails = JSON.parse(localStorage.getItem(name));
                console.log(this.historyDetails);

            },

            clearHistory() {
                localStorage.clear();
                window.location.href = '/Scans';
            }





        }
    }
    
