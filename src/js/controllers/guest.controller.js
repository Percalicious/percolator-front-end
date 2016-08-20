function GuestController (MailService, WealthService, $scope){

	let vm = this;

	vm.profile = {};
	vm.getWEReport = getWEReport;
	// vm.givingStats = {};


	// We cannot use vm. notation for the charts to update with Asynchronous data correctly.
	// This is because we have to call $scope.$applyAsync() below in order to populate our
	// charts correctly.
	$scope.netWorthLabels = ['Net Worth Tier', 'Placeholder'];
	$scope.p2GLabels = ['P2G Score', 'PlaceHolder'];
	$scope.giftCapacityLabels = ['Gift Capacity', 'Placeholder'];
	$scope.incomeLabels = ['Income Tier', 'Placeholder'];
	$scope.realEstateLabels = ['Real Estate Tier', 'Placeholder'];

	init();

	function init (){
		vm.getWEReport();
	}

	function getWEReport(){
		let registrantDummyData = {
				last_name: 'Ricardo',
				first_name: 'Ricky',
				address_line1:	'Address 1',
				address_line2:	'Address 2 (optional)',
				city: 'The City',
				state:	'SC',
				zip: '99999'
		}

		WealthService.getProfileByAddress(registrantDummyData).then((res)=>{
			//Sets property values within vm.profile to more manageable property names
			let coname2value;
			console.log(res);
			if (res.data.jobs[1]) {
				coname2value= res.data.jobs[1].org_name;
			} else {
				coname2value= '';
			}

			let title2value;
			if (res.data.jobs[1]) {
				title2value= res.data.jobs[1].title;
			} else {
				title2value= '';
			}

			let spouseName;
			if (res.data.identity.marital_status.value === "M"){
				spouseName= res.data.relationship.spouse.full_name;
			} else {
				spouseName = '';
			}

			let netWorthTier;
			let netWorthRange = res.data.wealth.networth.text;
			if (netWorthRange === "Unable to Rate"){
				netWorthTier = 0;
			} else if (netWorthRange === "< $25K"){
				netWorthTier = 1;
			} else if (netWorthRange === "$25K-$50K"){
				netWorthTier = 2;
			} else if (netWorthRange === "$50K-$100K"){
				netWorthTier = 3;
			} else if (netWorthRange === "$100K-$500K"){
				netWorthTier = 4;
			} else if (netWorthRange === "$500K-$1MM"){
				netWorthTier = 5;
			} else if (netWorthRange === "$1MM-$5MM"){
				netWorthTier = 6;
			} else if (netWorthRange === "$5MM-$10MM"){
				netWorthTier = 7;
			} else if (netWorthRange === "$10MM-$25MM"){
				netWorthTier = 8;
			} else if (netWorthRange === "$25MM-$50MM"){
				netWorthTier = 9;
			} else if (netWorthRange === "$50MM-$100MM"){
				netWorthTier = 10;
			} else if (netWorthRange === "$100MM-$500MM"){
				netWorthTier = 11;
			} else if (netWorthRange === "$500MM+"){
				netWorthTier = 12;
			}

			let p2GVal;
			let p2GText;
			let p2G = res.data.giving.p2g_score.text;
			if (p2G === "1|5 - Excellent"){
							p2GVal = 5;
							p2GText = "Excellent";
						} else if (p2G === "2|5 - Above Average"){
							p2GVal = 4;
							p2GText = "Above Average";
						} else if (p2G === "3|5 - Average"){
							p2GVal = 3;
							p2GText = "Average";
						} else if (p2G === "4|5 - Fair"){
							p2GVal = 2;
							p2GText = "Fair";
						} else if (p2G === "5|5 - Unmatched"){
							p2GVal = 1;
							p2GText = "Unmatched";
						}	


			let giftCapacityTier;
			let giftCapacityRaw = res.data.giving.gift_capacity.text;
			if (giftCapacityRaw === "Unable to Rate"){
				giftCapacityTier = 0;
			} else if (giftCapacityRaw === "<$1K"){
				giftCapacityTier = 1;
			} else if (giftCapacityRaw === "$1K-$2K"){
				giftCapacityTier = 2;
			} else if (giftCapacityRaw === "$2K-$3K"){
				giftCapacityTier = 3;
			} else if (giftCapacityRaw === "$3K-$5K"){
				giftCapacityTier = 4;
			} else if (giftCapacityRaw === "$5K-$7.5K"){
				giftCapacityTier = 5;
			} else if (giftCapacityRaw === "$7.5K-$10K"){
				giftCapacityTier = 6;
			} else if (giftCapacityRaw === "$10K-$15K"){
				giftCapacityTier = 7;
			} else if (giftCapacityRaw === "$15K-$20K"){
				giftCapacityTier = 8;
			} else if (giftCapacityRaw === "$20K-$25K"){
				giftCapacityTier = 9;
			} else if (giftCapacityRaw === "$25K-$30K"){
				giftCapacityTier = 10;
			} else if (giftCapacityRaw === "$30K-$40K"){
				giftCapacityTier = 11;		
			} else if (giftCapacityRaw === "$40K-$50K"){
				giftCapacityTier = 12;
			} else if (giftCapacityRaw === "$50K-$75K"){
				giftCapacityTier = 13;
			} else if (giftCapacityRaw === "$75K-$100K"){
				giftCapacityTier = 14;
			} else if (giftCapacityRaw === "$100K-$200K"){
				giftCapacityTier = 15;
			} else if (giftCapacityRaw === "$200K-$300K"){
				giftCapacityTier = 16;
			} else if (giftCapacityRaw === "$300K-$500K"){
				giftCapacityTier = 17;
			} else if (giftCapacityRaw === "$500K-$1MM"){
				giftCapacityTier = 18;
			} else if (giftCapacityRaw === "$1MM-$5MM"){
				giftCapacityTier = 19;
			} else if (giftCapacityRaw === "$5MM+"){
				giftCapacityTier = 20;
			};

			let incomeTier;
			let incomeRange	= res.data.wealth.total_income.text;
			if (incomeRange === "Unable to Rate"){
				incomeTier = 0;
			} else if (incomeRange === "$1-$50K"){
				incomeTier = 1;
			} else if (incomeRange === "$50K-$100K"){
				incomeTier = 2;
			} else if (incomeRange === "$100K-$250K"){
				incomeTier = 3;
			} else if (incomeRange === "$$250K-$500K"){
				incomeTier = 4;
			} else if (incomeRange === "$500K+"){
				incomeTier = 5;
			} else if (incomeRange === "$10MM-$25MM"){
				incomeTier = 6;
			}

			let realEstateTier;
			let realEstateRange	= res.data.realestate.total_realestate_value.text;
			if (realEstateRange === "Unable to Rate"){
				realEstateTier = 0;
			} else if (realEstateRange === "$1-$250K"){
				realEstateTier = 1;
			} else if (realEstateRange === "$250K-$500K"){
				realEstateTier = 2;
			} else if (realEstateRange === "$500K-$750K"){
				realEstateTier = 3;
			} else if (realEstateRange === "$750K-$1MM"){
				realEstateTier = 4;
			} else if (realEstateRange === "$1MM-$2MM"){
				realEstateTier = 5;
			} else if (realEstateRange === "$2MM-$5MM"){
				realEstateTier = 6;
			} else if (realEstateRange === "$5MM-$10MM"){
				realEstateTier = 7;
			} else if (realEstateRange === "$10MM+"){
				realEstateTier = 8;
			}
						
			let kids;
			if (res.data.demographics.has_children) {
				kids = "Yes";
			} else {
				kids = "No";
			}

			vm.profile = {
				fullname: res.data.identity.full_name,
				email: res.data.identity.emails[0].email,
				spouseName: spouseName,
				kids: kids,
				age: res.data.identity.age,
				city: res.data.locations[0].address.city,
				state: res.data.locations[0].address.state.value,
				coname1: res.data.jobs[0].org_name,
				title1: res.data.jobs[0].title,
				coname2: coname2value,
				title2: title2value,
				netWorthTier: netWorthTier,
				netWorthRange: netWorthRange,
				income: res.data.wealth.total_income.text,
				incomeTier: incomeTier,
				incomeRange: incomeRange,
				realEstateTotalVal: res.data.realestate.total_realestate_value.text,
				realEstateTier: realEstateTier,
				realEstateRange: realEstateRange,
				accreditedInvestor: res.data.wealth.accredited_investor,
				numberRealEstateProperties: res.data.realestate.total_num_properties,
				estimatedAnnualDonations: res.data.giving.estimated_annual_donations.text,
				p2G: p2G.substring(0,3),
				p2GVal: p2GVal,
				p2GText: p2GText,
				giftCapacityTier: giftCapacityTier,
				giftCapacity: giftCapacityRaw,
				cashOnHand: res.data.wealth.cash_on_hand.text,
				businessOwnership: res.data.wealth.business_ownership.text,
				businessSalesVolume: res.data.wealth.business_sales_volume.text,
				influenceRating: res.data.wealth.influence_rating.text,
				totalStock: res.data.wealth.total_stock.text,
				totalPensions: res.data.wealth.total_pensions.text,
				investableAssets: res.data.wealth.investable_assets.text
			};
			console.log(vm.profile);

			let netWorthVal = vm.profile.netWorthTier;
			let netWorthMax = 12;
			let netWorthDifference = netWorthMax - netWorthVal;

			let p2GMax = 5;
			let p2GDifference = p2GMax-vm.profile.p2GVal;

            let giftCapacityMax = 20;
            let giftCapacityDifference = giftCapacityMax - vm.profile.giftCapacityTier;

			let incomeVal = vm.profile.incomeTier;
            let incomeMax = 6;
			let incomeDifference = incomeMax - incomeVal;

			let realEstateMax = 8;
			let realEstateDifference = realEstateMax - realEstateTier;

            $scope.$applyAsync($scope.netWorthData = [netWorthVal, netWorthDifference]);
            $scope.$applyAsync($scope.incomeData = [incomeVal, incomeDifference]);
            $scope.$applyAsync($scope.p2GData = [vm.profile.p2GVal, p2GDifference]);
            $scope.$applyAsync($scope.giftCapacityData = [vm.profile.giftCapacityTier, giftCapacityDifference]);
            $scope.$applyAsync($scope.realEstateData = [vm.profile.realEstateTier, realEstateDifference]);
		});
	}
}

GuestController.$inject = ['MailService', 'WealthService', '$scope'];
export { GuestController };