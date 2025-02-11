# IMPORTS STANDARD
import dataclasses
from copy import deepcopy
from pathlib import Path
from typing import Optional, Union

# IMPORTS INTERNAL
from openbb_terminal.core.models import (
    CredentialsModel,
    PreferencesModel,
    ProfileModel,
    UserModel,
)
from openbb_terminal.core.session.env_handler import (
    load_env_to_model,
    reading_env,
)

__env_dict = reading_env()
__credentials = load_env_to_model(__env_dict, CredentialsModel)
__preferences = load_env_to_model(__env_dict, PreferencesModel)


__profile = ProfileModel()
__local_user = UserModel(  # type: ignore
    credentials=__credentials,  # type: ignore
    preferences=__preferences,  # type: ignore
    profile=__profile,
)
__current_user = __local_user


def get_current_user() -> UserModel:
    """Get current user."""
    return deepcopy(__current_user)


def set_current_user(user: UserModel):
    """Set current user."""
    global __current_user  # pylint: disable=global-statement # noqa
    __current_user = user


def get_local_user() -> UserModel:
    """Get local user."""
    return deepcopy(__local_user)


def get_env_dict() -> dict:
    """Get env dict."""
    return deepcopy(__env_dict)


def get_local_preferences() -> PreferencesModel:
    """Get preferences."""
    return deepcopy(__preferences)  # type: ignore


def is_local() -> bool:
    """Check if user is guest.

    Returns
    -------
    bool
        True if user is guest, False otherwise.
    """
    return not bool(__current_user.profile.token)


def set_default_user():
    """Set default user."""
    env_dict = reading_env()
    credentials = load_env_to_model(env_dict, CredentialsModel)
    preferences = load_env_to_model(env_dict, PreferencesModel)
    profile = ProfileModel()
    local_user = UserModel(  # type: ignore
        credentials=credentials,
        preferences=preferences,
        profile=profile,
    )
    set_current_user(local_user)


def copy_user(
    credentials: Optional[CredentialsModel] = None,
    preferences: Optional[PreferencesModel] = None,
    profile: Optional[ProfileModel] = None,
    user: Optional[UserModel] = None,
):
    current_user = user or get_current_user()
    credentials = credentials or current_user.credentials
    preferences = preferences or current_user.preferences
    profile = profile or current_user.profile

    user_copy = UserModel(  # type: ignore
        credentials=credentials,
        preferences=preferences,
        profile=profile,
    )

    return user_copy


def set_preference(
    name: str,
    value: Union[bool, Path, str],
):
    """Set preference

    Parameters
    ----------
    name : str
        Preference name
    value : Union[bool, Path, str]
        Preference value
    """
    current_user = get_current_user()
    updated_preferences = dataclasses.replace(current_user.preferences, **{name: value})  # type: ignore
    updated_user = dataclasses.replace(current_user, preferences=updated_preferences)  # type: ignore
    set_current_user(updated_user)


def set_credential(name: str, value: str):
    """Set credential

    Parameters
    ----------
    name : str
        Credential name
    value : str
        Credential value
    """
    current_user = get_current_user()
    updated_credentials = dataclasses.replace(current_user.credentials, **{name: value})  # type: ignore
    updated_user = dataclasses.replace(current_user, credentials=updated_credentials)  # type: ignore
    set_current_user(updated_user)
