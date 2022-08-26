import * as React from "react";
import styles from "./CreateList.module.scss";
import { ICreateListProps } from "./ICreateListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react";
import { CreateListState } from "./CreateListState";
import { ListService } from "../../services/listservice";
export default class CreateList extends React.Component<
  ICreateListProps,
  CreateListState
> {
  constructor(props) {
    super(props);
    this.state = { listname: "" };
    this.onListNameChange = this.onListNameChange.bind(this);
    this.onAddList = this.onAddList.bind(this);
  }
  public render(): React.ReactElement<ICreateListProps> {
    return (
      <div className={styles.createList}>
        <div>
          <TextField
            label="Enter list name"
            onChange={this.onListNameChange}
            value={this.state.listname}
          />
          <br />
          <PrimaryButton text="Add list" onClick={this.onAddList} />
        </div>
      </div>
    );
  }
  private onListNameChange(event, newvalue): void {
    this.setState({ listname: newvalue });
  }
  private onAddList(): void {
    // alert("create list called");
    if (this.state.listname !== "") {
      ListService.isListExists(
        this.props.context.pageContext.web.absoluteUrl,
        this.state.listname,
        this.props.context.spHttpClient
      )
        .then((isexists: boolean) => {
          if (!isexists) {
            //create list , list does not exist
            ListService.createList(
              this.props.context.pageContext.web.absoluteUrl,
              this.state.listname,
              this.props.context.spHttpClient
            )
              .then((created: boolean) => {
                if (created) {
                  this.setState({ listname: "" });
                  alert("list created");
                } else {
                  alert("list could not be created");
                }
              })
              .catch((error) => {
                alert("an error occurred while creating list");
              });
          } else {
            alert("list already exists.");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }
}
