import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UnsubscribeOnDestroyAdapter} from "src/app/shared/UnsubscribeOnDestroyAdapter";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {AuthBody} from "../../shared/utils/auth-body";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;

  authBody = new AuthBody();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthenticationService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    sessionStorage.removeItem('app-token');
    sessionStorage.removeItem('isLoggedin');
    this.authForm = this.formBuilder.group({
      username: ["MyClinique", Validators.required],
      password: ["MyClinique2K22", Validators.required],
    });
  }

  get f() {
    return this.authForm.controls;
  }

  adminSet() {
    this.authForm.get("username").setValue("admin@hospital.org");
    this.authForm.get("password").setValue("admin@123");
  }

  doctorSet() {
    this.authForm.get("username").setValue("doctor@hospital.org");
    this.authForm.get("password").setValue("doctor@123");
  }

  patientSet() {
    this.authForm.get("username").setValue("patient@hospital.org");
    this.authForm.get("password").setValue("patient@123");
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Nom d'utilisateur et mot de passe non valides !";
      return;
    } else {
      this.authBody.username = this.authForm.value.username;
      this.authBody.password = this.authForm.value.password;
      this.subs.sink = this._authService
        .login(this.authBody)
        .subscribe(
          (res) => {
            if (res['ok'] === true) {
              setTimeout(() => {
                this.toastr.success(res['message']);
                localStorage.setItem('app-token', btoa(JSON.stringify(res['data'])));
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigate(["/admin/dashboard/main"]);
                this.loading = false;
              }, 1000);
            } else {
              this.error = "Identifiant invalide";
              this.toastr.error(res['message']);
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }
}
