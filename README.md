# Angular2023
Whole end to end Angular sample applications with state management using ngrx and serverside rendering for 2023

# Creating a new application
- ng new my-first-application --no-strict
- [ngModel] and others attributes/ properties are in the FormsModule
- you can display a variable in the front end template using `{{}}`
    - this is known as string interpolation
    - for example
    - ```typescript
        firstName: string = "Dylan";
        ```
    - ```html
        <p>{{firstName}}</p>
        ```
- You can do property binding as well, that is you can bind HTML properties to the variables in your components.
    - for example
    - ```typescript
         allowNewServers: boolean = false;
        ```
    - ```html
        <button [disabled]="allowNewServers">Add server</button>
        ```
- Angular also provides it's own properties like `(click)` to bind events to different functions
    - for example
    - ```typescript
        onCreateServer(){
            this.serverCreationStatus = "New server was created";
        }
        ```
    - ```html
        <button (click)="onCreateServer()">Create server</button>
        ```
- With the use of this event binding you could achieve a psedo two way binding by doing something like this:
    - for example:
    - ```typescript
        serverName: string = "Server name";
        onInputChange(event : any){
            this.serverName = (<HTMLInputElement>event.target).value;
        }
        ```
    - ```html
        <input type="text" (input)="onInputChange($event)">
        <p>{{serverName}}</p>
        ```
- This is a rather lengthy and hacky way to achieve this, angular provides two way binding out of the box with the user of forms module.
    - you can use `[(ngModel)]` for achieving two way binding instead.
- [*ngIf] directive can be used to load something conditionally
    - for example:
    - ```html
        <p [*ngIf]="getServerStatus()">{{serverStatus}}</p>
        ```
- You can also add an else clause to the *`ngIf`
    - for example:
    - ```html
        <p *ngIf="getServerStatus(); else noServer">{{serverStatus}}</p>
        <ng-template #noServer>
            <p>No server has been created</p>
        </ng-template>
        ```
- You can use the [ngStyle] directive to load style dynamically
    - for example:
    - ```html
        <p [ngStyle]="{backgroundColor: getColor()}">{{serverStatus}}</p>
        ```
- You can attach CSS classes dynamically to the the html element by using the `[ngClass]` directive
    - for example:
    - ```html
        <p [ngClass]="{online: status==='online'}">{{serverStatus}}</p>
        ```
- You can iterate through an array or an object using the `*ngFor` directive
    - for example:
    - ```html
        <app-server *ngFor="let server of servers; let i = index">
        </app-server>
        ```
- ## Forms
- ## Template Driven forms
    - If you want to use simple forms without complex implementation, template driven forms are a way to go.
    - import FromModule into the modules
    - and then sue the form tag to implement template driven forms
    - by default form tag has the implicit connection to ngForm
    - Which can be removed to using `[formGroup]` when using Reactive forms
    - you can pass the reference to the ngForm to a variable in the template and then pass that with ngSubmit event.
    - for example:
    - ```html
        <h1>Template driven forms</h1>
        <form #f="ngForm" (ngSubmit)="update(f)">
        <input type="text" name="firstName" ngModel><br>
        <input type="text" name="lastName" ngModel><br>
        <input type="text" name="id" ngModel><br>
        <button type="submit">Submit</button>
        </form>
        ```
    - ```typescript
        update(form : any){
            console.log(form.value);
            return false;
        }
        ```
- ## Reactive forms
    - If you're implementing complex forms with complex customizations and validations, it's better to use Reactive forms and form builder.
    - for example:
    - Trying to create a complex form which looks like this
    - ```json
        {firstName: 'John', lastName: 'doe', id: '321', address: {
            street: 'no', state: 'where', pinCode: '1234'
        }}
        ```
    - You could use form builder with dependency injection to create something like this:
    - ```typescript
        constructor(fb: FormBuilder){

        this.myForm = fb.group({
        'firstName': [''],
        'lastName': [''],
        'id':[''],
        'address': fb.group({
            'street': [''],
            'state': [''],
            'pinCode':['']
        })
        });

        }
        ```
    - And then you can link it to the view like this:
    - ```html
        <h1>Reactive forms module</h1>
        <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
        <input type="text" name="firstName" id="firstName" placeholder="" formControlName="firstName"><br>
        <input type="text" name="lastName" formControlName="lastName" formControlName="lastName"><br>
        <input type="text" name="id" formControlName="id" formControlName="id"><br>
        <form formGroupName="address">
            <input type="text" name="street" formControlName="street"><br>
            <input type="text" name="pincode" formControlName="pinCode"><br>
            <input type="text" name="state" formControlName="state"><br>
        </form>
        <button type="submit">Submit</button>
        </form>
        ```
    - you can also use other concepts like formsArray and link it to the view with formsArrayName to use the array in the json structre as needed.

- ## Validation
    - you can add validation to the reactive forms by using Validators and you can even implement custom Validators if needed.
    - for example:
    - ```typescript
          constructor(fb: FormBuilder){
            this.myForm = fb.group({
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required],
            'id':['', Validators.required],
            'address': fb.group({
                'street': [''],
                'state': [''],
                'pinCode':['']
            })
            });

        }
        ```
    - On the view, you can do various different things. One of them would be to pass the reference to the abscract control {form control} to some variable and then se ngIf or ngClass to trigger various conditions and css to reming the user that there is some issue with the input.
    - for example:
    - ```typescript

        firstName: AbstractControl;
        
        firstName = myForm.controls['firstName'];

        ```
    - Now, this first name can be used in the view to trigger different conditions without writing the whole verbose thing.
    - You can also disable the button itself for submitting by using the `[disabled]` attribte and passing it the validity of the whole form or maybe some part of the form.
    - you can even implement complex validation on a nested form using something like this:
    - for example:
    - ```typescript
        constructor(fb: FormBuilder){
        this.myForm = fb.group({
        'firstName': ['', Validators.required],
        'lastName': ['', Validators.required],
        'id':['', Validators.required],
        'address': fb.group({
            'street': [''],
            'state': ['',Validators.required],
            'pinCode':['']
        })
        });

        }
        ```
    - ```html
        <h1>Reactive forms module</h1>
        <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
        <input type="text" name="firstName" formControlName="firstName"><br>
        <input type="text" name="lastName" formControlName="lastName"><br>
        <input type="text" name="id" formControlName="id"><br>
        <form formGroupName="address">
            <input type="text" name="street" formControlName="street"><br>
            <input type="text" name="pincode" formControlName="pinCode"><br>
            <input type="text" name="state" formControlName="state"><br>
        </form>
        <button type="submit" [disabled]="!myForm.valid || !myForm.get('address')?.valid">Submit</button>
        </form>```
    - For example let's write a custom validator that returns invalidId in case the id field doesn't start with prefix 123
    -  ```typescript
              constructor(fb: FormBuilder){
                this.myForm = fb.group({
                'firstName': ['', Validators.required],
                'lastName': ['', Validators.required],
                'id':['', Validators.compose([Validators.required,this.idValidator])],
                'address': fb.group({
                    'street': [''],
                    'state': ['',Validators.required],
                    'pinCode':['']
                })
                });

             }

              idValidator(control : FormControl) : {[s: string]: boolean} | null{
                if(!control.value.match(/^123/))
                return {invalidId : true};

                return null;
            }
        ```
    - Here, you can notice that we have used Validators.compose([]) to combine the validators in the form of an array to be able to use multiple validators on the same field.
    - We were also able to write a custom validator, the validator function should be of the return type `{[s: string]: boolean} | null`

- So, it can be observed that with the help of Reactive forms, we're able to create a pretty compilicated nested form/ json object which had multiple validation at each field.
- Both FormControl as well as FormGroup has an EventEmitter(Observable) which can be used to subscribe to the changes which may occur to these
- For example:
- ```typescript
        this.myForm.valueChanges.subscribe((form : any)=>{
        console.log('form changed to :', form);
        });

        this.myForm.get('address')?.valueChanges.subscribe((form : any)=>{
        console.log('address changed to',form);
        });
    ```