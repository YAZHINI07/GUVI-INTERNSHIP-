
        var personProperties;
        var finalLoginName;
        var clientContext;
        var managerName;
        var peopleManager;
 
        $(document).ready(function () {
            initializePeoplePicker('userPeoplePicker', null, null, '500', false);
 
        });
 
        function initializePeoplePicker(peoplePickerElementId, displayName, userName, width, AllowMultipleValues) {
            var schema = {};
            schema['PrincipalAccountType'] = 'User';
            schema['SearchPrincipalSource'] = 15;
            schema['ResolvePrincipalSource'] = 15;
            schema['AllowMultipleValues'] = AllowMultipleValues;
            schema['MaximumEntitySuggestions'] = 20;
            schema['Width'] = width + 'px';
            schema['margin-left'] = '5px';
            schema['height'] = '50px';
            var users = null;
 
            if (displayName != null) {
                users = new Array(1);
                var user = new Object();
                user.AutoFillDisplayText = displayName;
                user.AutoFillKey = userName;
                user.AutoFillSubDisplayText = "";
                user.DisplayText = displayName;
                user.EntityType = "User";
                user.IsResolved = true;
                user.Key = userName;
                user.ProviderDisplayName = "Tenant";
                user.ProviderName = "Tenant";
                user.Resolved = true;
                users[0] = user;
                getUserData(displayName);
                 
            }
            this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, users, schema);
        }
 
        function getUserData() {
 
            clientContext = new SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var userLoginName = $("#userPeoplePicker_TopSpan_HiddenInput").val();
 
            console.log("userLoginName: " + userLoginName);
            var userArray = ((userLoginName.substr(0, userLoginName.length - 2)).substr(2)).split(',');
            var user1 = userArray[0].split(/:(.+)/)[1];
            finalLoginName = (user1.substr(0, user1.length - 1)).substr(1);
 
            peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
            personProperties = peopleManager.getPropertiesFor(finalLoginName);
            clientContext.load(personProperties);
            clientContext.executeQueryAsync(getCurrentUserSuccess, getCurrentUserFail);
        }
 
 
        function getCurrentUserSuccess() {
            managerName = peopleManager.getPropertiesFor(personProperties.get_userProfileProperties()['Manager']);
            clientContext.load(managerName);
            clientContext.executeQueryAsync(onFinalSuccess, getCurrentUserFail);
 
        }
 
        function onFinalSuccess() {
            $get("userName").innerHTML = "<b>Name: " + personProperties.get_userProfileProperties()['PreferredName'] + "</b>";
            $get("userDesignation").innerHTML = "<b>Designation: </b>" + personProperties.get_userProfileProperties()['SPS-JobTitle'];
            $get("userEmployeeID").innerHTML = "<b>Employee ID: </b>" + personProperties.get_userProfileProperties()['EmployeeID'];
            $get("userWorkEmailID").innerHTML = "<b>Email ID: </b>" + personProperties.get_userProfileProperties()['WorkEmail'];
            $get("userPhone").innerHTML = "<b>Phone No.: </b>" + personProperties.get_userProfileProperties()['WorkPhone'];
            $get("userDepartment").innerHTML = "<b>Department: </b>" + personProperties.get_userProfileProperties()['SPS-Department'];
            $get("userManager").innerHTML = "<b>Manager: </b>" + personProperties.get_userProfileProperties()['SPS-Location'];
            $get("userLocation").innerHTML = "<b>Location: </b>" + managerName.get_userProfileProperties()['PreferredName'];
        }
 
        function getCurrentUserFail() {
            alert("Operation Failed!");
        }
        <table>
        <tr>
            <td>Enter the name of the User:</td>
            <td><div id="userPeoplePicker" style="margin-top:0px;"></div></td>
        </tr>
        <tr>
            <td colspan="2" align="left"><input type="button" value="Get User Data" onclick="getUserData()" /></td>
        </tr>
        <tr>
            <td><b>Name</b></td>
            <td><div id="userName"></div></td>
        </tr>
        <tr>
            <td><b>Designation</b></td>
            <td><div id="userDesignation"></div></td>
        </tr>
        <tr>
            <td><b>Employee ID</b></td>
            <td><div id="userEmployeeID"></div></td>
        </tr>
        <tr>
            <td><b>Email ID</b></td>
            <td><div id="userWorkEmailID"></div></td>
        </tr>
        <tr>
            <td><b>Phone No.</b></td>
            <td><div id="userPhone"></div></td>
        </tr>
        <tr>
            <td><b>Department</b></td>
            <td><div id="userDepartment"></div></td>
        </tr>
        <tr>
            <td><b>Manager</b></td>
            <td><div id="userManager"></div></td>
        </tr>
        <tr>
            <td><b>Location</b></td>
            <td><div id="userLocation"></div></td>
        </tr>
    </table>
